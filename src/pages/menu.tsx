import React from "react";
import { style } from "./styles";
import {
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Pedidos: { modo?: 'editar' | undefined };
  NovoPedido: undefined;
  EditarPedido: { pedido: any };
  ExcluirPedidos: undefined;
};

export default function Menu() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <Text style={style.titleText}>Menu</Text>
            </View>
            
            <View style={style.buttonsContainer}>
                <View style={style.topRow}>
                    <TouchableOpacity 
                        style={style.gridButton}
                        onPress={() => navigation.navigate('NovoPedido')}
                    >
                        <Text style={style.buttonText}>Novo Pedido</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.gridButton}
                        onPress={() => navigation.navigate('Pedidos', { modo: 'editar' })}
                    >
                        <Text style={style.buttonText}>Editar Pedidos</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.bottomRow}>
                    <TouchableOpacity 
                        style={style.gridButton}
                        onPress={() => navigation.navigate('Pedidos', { modo: undefined })}
                    >
                        <Text style={style.buttonText}>Ver Pedidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.gridButton}
                        onPress={() => navigation.navigate('ExcluirPedidos')}
                    >
                        <Text style={style.buttonText}>Excluir Pedidos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

