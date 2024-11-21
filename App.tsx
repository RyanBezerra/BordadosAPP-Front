import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/pages/menu';
import Pedidos from './src/pages/pedidos';
import NovoPedido from './src/pages/novoPedido';
import EditarPedido from './src/pages/editarPedido';
import ExcluirPedidos from './src/pages/excluirPedidos';

type RootStackParamList = {
  Menu: undefined;
  Pedidos: undefined;
  NovoPedido: undefined;
  EditarPedido: { pedido: {
    id: string;
    cliente: string;
    nome: string;
    preco: number;
    status: string;
  }};
  ExcluirPedidos: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Pedidos" component={Pedidos} />
          <Stack.Screen name="NovoPedido" component={NovoPedido} />
          <Stack.Screen name="EditarPedido" component={EditarPedido} />
          <Stack.Screen name="ExcluirPedidos" component={ExcluirPedidos} />
        </Stack.Navigator> 
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    // Adicione estilos aqui, se necessário.
});
