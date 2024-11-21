import React, { useState } from "react";
import { style } from "./styles";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { pedidosService, clientesService } from '../services/index.mjs';
import { RouteProp } from '@react-navigation/native';

type EditarPedidoRouteParams = {
    pedido: {
        id: string;
        cliente: {
            id: string;
            nome: string;
            numero_interno: string;
            cpf: string;
            telefone: string;
        };
        atendente: string;
        texto_bordado: string;
        cor_bordado: string;
        tipo_fonte: string;
    };
};

export default function EditarPedido() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: EditarPedidoRouteParams }>>();
    const { pedido } = route.params;

    const [nomeCliente, setNomeCliente] = useState(pedido.cliente.nome);
    const [numeroInterno, setNumeroInterno] = useState(pedido.cliente.numero_interno);
    const [cpf, setCpf] = useState(pedido.cliente.cpf);
    const [telefone, setTelefone] = useState(pedido.cliente.telefone);
    const [atendente, setAtendente] = useState(pedido.atendente);
    const [textoBordado, setTextoBordado] = useState(pedido.texto_bordado);
    const [corBordado, setCorBordado] = useState(pedido.cor_bordado);
    const [tipoFonte, setTipoFonte] = useState(pedido.tipo_fonte);

    const handleSubmit = async () => {
        if (!atendente || !textoBordado || !corBordado || !tipoFonte) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            await Promise.all([
                clientesService.update(pedido.cliente.id, {
                    nome: nomeCliente.trim(),
                    numero_interno: numeroInterno.trim(),
                    cpf: cpf.trim(),
                    telefone: telefone.trim()
                }),
                pedidosService.update(pedido.id, {
                    cliente: pedido.cliente.id,
                    atendente: atendente.trim(),
                    texto_bordado: textoBordado.trim(),
                    cor_bordado: corBordado.trim(),
                    tipo_fonte: tipoFonte.trim()
                })
            ]);

            Alert.alert('Sucesso', 'Pedido atualizado com sucesso');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Erro', 'Não foi possível atualizar o pedido');
        }
    };

    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <Text style={style.titleText}>Editar Pedido</Text>
            </View>

            <ScrollView>
                <View style={style.formContainer}>
                    <Text style={style.sectionTitle}>Dados do Cliente</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Nome do Cliente"
                        placeholderTextColor="#666"
                        value={nomeCliente}
                        onChangeText={setNomeCliente}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Número Interno"
                        placeholderTextColor="#666"
                        value={numeroInterno}
                        onChangeText={setNumeroInterno}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="CPF"
                        placeholderTextColor="#666"
                        value={cpf}
                        onChangeText={setCpf}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Telefone"
                        placeholderTextColor="#666"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />

                    <Text style={style.sectionTitle}>Dados do Pedido</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Nome do Atendente"
                        placeholderTextColor="#666"
                        value={atendente}
                        onChangeText={setAtendente}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Texto a ser Bordado"
                        placeholderTextColor="#666"
                        value={textoBordado}
                        onChangeText={setTextoBordado}
                        multiline
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Cor do Bordado"
                        placeholderTextColor="#666"
                        value={corBordado}
                        onChangeText={setCorBordado}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Tipo de Fonte"
                        placeholderTextColor="#666"
                        value={tipoFonte}
                        onChangeText={setTipoFonte}
                    />

                    <TouchableOpacity 
                        style={style.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={style.buttonText}>Salvar Alterações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={style.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={style.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
} 