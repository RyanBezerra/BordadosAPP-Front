import { TextInput, TextInputProps } from 'react-native';

export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput style={ { 
            height: 54, 
            borderWidth: 1, 
            borderColor: '#999', 
            borderRadius: 7, 
            paddingHorizontal: 16,
            } } {...rest} 
            />
    )
}
