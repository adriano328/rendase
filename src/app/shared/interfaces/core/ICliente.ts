export interface ICliente {
    id?: number,
    nome: string,
    cpf: string,
    endereco: IEndereco,
    contato: string
}

export interface IEndereco {
    rua: string,
    numero: number,
    bairro: string,
    cidade: ICidade
}

export interface ICidade {
    id: number,
    nome?: string,
}

