import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:8000/api'
});

export const clientesService = {
    getAll: async () => {
        try {
            const response = await api.get('/clientes/');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw error;
        }
    },
    getById: (id) => api.get(`/clientes/${id}/`),
    create: (data) => api.post('/clientes/', data),
    update: (id, data) => api.put(`/clientes/${id}/`, data),
    delete: (id) => api.delete(`/clientes/${id}/`)
};

export const pedidosService = {
    getAll: async () => {
        try {
            const response = await api.get('/pedidos/');
            
            const pedidosProcessados = await Promise.all(response.data.map(async (pedido) => {
                const clienteResponse = await api.get(`/clientes/${pedido.cliente}/`);
                return {
                    ...pedido,
                    cliente: {
                        id: clienteResponse.data.id,
                        nome: clienteResponse.data.nome,
                        numero_interno: clienteResponse.data.numero_interno,
                        cpf: clienteResponse.data.cpf,
                        telefone: clienteResponse.data.telefone
                    }
                };
            }));

            console.log('DADOS COMPLETOS DOS PEDIDOS:', pedidosProcessados);
            return pedidosProcessados;
        } catch (error) {
            console.error('ERRO AO BUSCAR PEDIDOS:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await api.get(`/pedidos/${id}/`);
            console.log('Dados do pedido específico:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            console.log('Dados enviados:', data);
            const response = await api.post('/pedidos/', {
                cliente: data.cliente,
                atendente: data.atendente,
                texto_bordado: data.texto_bordado,
                cor_bordado: data.cor_bordado,
                tipo_fonte: data.tipo_fonte
            });
            return response.data;
        } catch (error) {
            console.error('Dados enviados que causaram erro:', data);
            console.error('Erro detalhado:', error.response?.data);
            throw error;
        }
    },
    update: (id, data) => api.put(`/pedidos/${id}/`, data),
    delete: async (pedidoId) => {
        try {
            // Primeiro, obtém os dados do pedido para pegar o ID do cliente
            const pedido = await api.get(`/pedidos/${pedidoId}/`);
            const clienteId = pedido.data.cliente;

            // Exclui o pedido
            await api.delete(`/pedidos/${pedidoId}/`);
            
            // Depois exclui o cliente
            await api.delete(`/clientes/${clienteId}/`);

            return true;
        } catch (error) {
            console.error('Erro ao excluir pedido e cliente:', error);
            throw error;
        }
    }
};