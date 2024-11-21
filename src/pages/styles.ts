import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerContainer: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor: '#1E1E1E',
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    titleText: {
        fontSize: 24,
        fontWeight: '300',
        letterSpacing: 2,
        color: '#FFFFFF',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    buttonsContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridButton: {
        width: '48%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '300',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    bordadoInfo: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },
    pedidoCard: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333333',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    pedidoCardReadOnly: {
        opacity: 0.7,
    },
    pedidoText: {
        fontSize: 14,
        marginVertical: 2,
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    listContainer: {
        padding: 16,
        backgroundColor: '#121212',
    },
    emptyText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    backButton: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333333',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#FFFFFF',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        color: '#FFFFFF',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#2E8B57',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    labelText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pedidoItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    itemContent: {
        padding: 16,
    },
    itemHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
        marginBottom: 8,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
    },
    itemBody: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
        minWidth: 100,
    },
    value: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    subtitleText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
})