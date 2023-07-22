export interface IProduto {
    id?: number,
    descricao: string,
    categoria: ICategoria;
    cor: string,
    preco: number,
    tamanho: string,
    sexo: string
}

export interface ICategoria {
    id: number,
    descricao?: string
}