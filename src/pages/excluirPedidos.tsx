import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { style } from './styles';
import { pedidosService } from '../services/index.mjs';

export default function ExcluirPedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        carregarPedidos();
    }, []);

    const carregarPedidos = async () => {
        try {
            const listaPedidos = await pedidosService.getAll();
            setPedidos(listaPedidos);
            setIsLoading(false);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar pedidos');
            setIsLoading(false);
        }
    };

    const confirmarExclusao = (pedido: any) => {
        Alert.alert(
            'Confirmar Exclusão',
            `Deseja realmente excluir o pedido #${pedido.id} e todos os dados do cliente ${pedido.cliente.nome}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: () => excluirPedido(pedido.id),
                    style: 'destructive'
                }
            ]
        );
    };

    const excluirPedido = async (pedidoId: number) => {
        try {
            await pedidosService.delete(pedidoId);
            setPedidos(pedidos.filter(pedido => pedido.id !== pedidoId));
            Alert.alert('Sucesso', 'Pedido e dados do cliente excluídos com sucesso');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao excluir pedido e dados do cliente');
            console.error('Erro detalhado:', error);
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity 
            style={style.pedidoCard}
            onPress={() => confirmarExclusao(item)}
        >
            <Text style={style.sectionTitle}>Dados do Cliente</Text>
            <Text style={style.pedidoText}>Nome: {item.cliente?.nome}</Text>
            <Text style={style.pedidoText}>Número Interno: {item.cliente?.numero_interno}</Text>
            <Text style={style.pedidoText}>CPF: {item.cliente?.cpf}</Text>
            <Text style={style.pedidoText}>Telefone: {item.cliente?.telefone}</Text>

            <Text style={style.sectionTitle}>Dados do Pedido</Text>
            <Text style={style.pedidoText}>Atendente: {item.atendente}</Text>
            <Text style={style.pedidoText}>Texto do Bordado: {item.texto_bordado}</Text>
            <Text style={style.pedidoText}>Cor do Bordado: {item.cor_bordado}</Text>
            <Text style={style.pedidoText}>Tipo de Fonte: {item.tipo_fonte}</Text>
            <Text style={style.pedidoText}>Status: {item.status}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <Text style={style.titleText}>Excluir Pedidos</Text>
            </View>
            
            {isLoading ? (
                <View style={style.loadingContainer}>
                    <ActivityIndicator size="large" color="#2E8B57" />
                    <Text style={style.loadingText}>Carregando pedidos...</Text>
                </View>
            ) : (
                <>
                    {pedidos.length > 0 ? (
                        <FlatList
                            data={pedidos}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={style.listContainer}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>Nenhum pedido encontrado</Text>
                        </View>
                    )}
                </>
            )}
        </View>
    );
} 