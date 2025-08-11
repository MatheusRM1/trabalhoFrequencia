import { AlunoLocalData, Presenca } from '@/types/types';
import { Alert } from 'react-native';

export function usePresenca() {
  const registrarPresenca = async (
    token: string, 
    alunoData: AlunoLocalData,
    onSuccess: (novosDados: AlunoLocalData) => Promise<void>
  ) => {
    try {
      if (alunoData.presencas.some(p => p.token === token)) {
        Alert.alert('Aviso', 'Presença já registrada para esta aula');
        return false;
      }

      const novaPresenca: Presenca = {
        token,
        data: new Date().toISOString()
      };

      const dadosAtualizados = {
        ...alunoData,
        presencas: [...alunoData.presencas, novaPresenca]
      };

      await onSuccess(dadosAtualizados);

      try {
        await fetch('https://sua-api.com/registrar-presenca', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            token, 
            matricula: alunoData.matricula 
          })
        });
      } catch (apiError) {
        console.log('Falha na API, mas dados salvos localmente:', apiError);
      }

      Alert.alert('Sucesso', 'Presença registrada!');
      return true;
    } catch (error) {
      console.error('Erro ao registrar presença:', error);
      Alert.alert('Erro', 'Falha ao registrar presença');
      return false;
    }
  };

  return {
    registrarPresenca
  };
}
