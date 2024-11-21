import React, { useState, useEffect } from "react";
import { style } from "./styles";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { clientesService, pedidosService } from '../services/index.mjs';

type RootStackParamList = {
    Pedidos: { modo?: 'editar' | undefined };
    EditarPedido: { pedido: any };
};

type PedidosScreenRouteProp = RouteProp<RootStackParamList, 'Pedidos'>;
type PedidosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Pedidos() {
    const navigation = useNavigation<PedidosScreenNavigationProp>();
    const route = useRoute<PedidosScreenRouteProp>();
    const [isLoading, setIsLoading] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    const podeEditar = route.params?.modo === 'editar';

    useEffect(() => {
        carregarPedidos();
    }, []);

    const carregarPedidos = async () => {
        setIsLoading(true);
        try {
            const data = await pedidosService.getAll();
            setPedidos(data);
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderPedido = ({ item }) => {
        console.log('Dados completos do item:', item);
        
        return (
            <TouchableOpacity 
                style={[style.pedidoCard, !podeEditar && style.pedidoCardReadOnly]}
                onPress={() => {
                    if (podeEditar) {
                        navigation.navigate('EditarPedido', {
                            pedido: {
                                id: item.id,
                                cliente: {
                                    id: item.cliente.id,
                                    nome: item.cliente.nome,
                                    numero_interno: item.cliente.numero_interno,
                                    cpf: item.cliente.cpf,
                                    telefone: item.cliente.telefone
                                },
                                atendente: item.atendente,
                                texto_bordado: item.texto_bordado,
                                cor_bordado: item.cor_bordado,
                                tipo_fonte: item.tipo_fonte
                            }
                        });
                    }
                }}
                disabled={!podeEditar}
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
    };

    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <Text style={style.titleText}>
                    {podeEditar ? 'Editar Pedidos' : 'Ver Pedidos'}
                </Text>
            </View>

            {isLoading ? (
                <View style={style.loadingContainer}>
                    <ActivityIndicator size="large" color="#2E8B57" />
                    <Text style={style.loadingText}>Carregando pedidos...</Text>
                </View>
            ) : (
                <FlatList
                    data={pedidos}
                    renderItem={renderPedido}
                    keyExtractor={item => item.id}
                    contentContainerStyle={style.listContainer}
                    ListEmptyComponent={() => (
                        <Text style={style.emptyText}>Nenhum pedido encontrado</Text>
                    )}
                />
            )}

            <TouchableOpacity 
                style={style.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={style.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}
