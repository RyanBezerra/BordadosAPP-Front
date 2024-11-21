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
import { useNavigation } from '@react-navigation/native';
import { pedidosService, clientesService } from '../services/index.mjs';

export default function NovoPedido() {
    const navigation = useNavigation();
    // Cliente fields
    const [nomeCliente, setNomeCliente] = useState('');
    const [numeroInterno, setNumeroInterno] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    // Pedido fields
    const [atendente, setAtendente] = useState('');
    const [textoBordado, setTextoBordado] = useState('');
    const [corBordado, setCorBordado] = useState('');
    const [tipoFonte, setTipoFonte] = useState('');

    const handleSubmit = async () => {
        if (!nomeCliente || !numeroInterno || !cpf || !telefone || 
            !atendente || !textoBordado || !corBordado || !tipoFonte) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            // Criar cliente primeiro
            const clienteResponse = await clientesService.create({
                nome: nomeCliente,
                numero_interno: numeroInterno,
                cpf,
                telefone
            });

            // Criar pedido usando o ID do cliente retornado
            await pedidosService.create({
                cliente: clienteResponse.data.id,  // Enviando apenas o ID
                atendente,
                texto_bordado: textoBordado,
                cor_bordado: corBordado,
                tipo_fonte: tipoFonte
            });
            
            Alert.alert('Sucesso', 'Pedido criado com sucesso');
            navigation.goBack();
        } catch (error) {
            console.error('Erro completo:', error);
            Alert.alert('Erro', error.response?.data?.cliente?.[0] || 'Não foi possível criar o pedido');
        }
    };

    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <Text style={style.titleText}>Novo Pedido</Text>
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
                        <Text style={style.buttonText}>Criar Pedido</Text>
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