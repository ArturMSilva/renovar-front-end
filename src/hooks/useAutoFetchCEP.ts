import { useEffect } from 'react';
import { validateCEP } from '../utils/validation';
import { fetchCEP } from '../utils/cep';

interface AddressData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface UseAutoFetchCEPParams {
  cep: string;
  onSuccess: (data: AddressData) => void;
  onError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAutoFetchCEP = ({ cep, onSuccess, onError, setLoading }: UseAutoFetchCEPParams) => {
  useEffect(() => {
    const fetchAddressAutomatically = async () => {
      if (validateCEP(cep)) {
        setLoading(true);
        const data = await fetchCEP(cep);
        setLoading(false);

        if (data) {
          onSuccess({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          });
        } else {
          onError('CEP não encontrado');
        }
      }
    };

    const timeoutId = setTimeout(fetchAddressAutomatically, 500);
    return () => clearTimeout(timeoutId);
  }, [cep, onSuccess, onError, setLoading]);
};
