import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemDeCidade {
  id: number;
  nomeCidade: string;
}

export interface IDetalheCidade {
  id: number;
  nomeCidade: string;
}

type TCidadeComTotalCount = {
  data: IListagemDeCidade[];
  totalCount: number;
  dataTotalItems: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCidadeComTotalCount | Error> => {
  try {
    const { data, headers } = await Api.get(
      `/cidades?_page=${page}&_per_page=${Environment.LIMITE_DE_LINHAS}&nomeCidade=${filter}`
    );
    const dataValue = data.data;
    const dataTotalItems = data.items;
    if (dataValue) {
      return {
        data: dataValue,
        dataTotalItems,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }
    return new Error("Erro ao listar os registros!");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as Error).message || "Erro ao listar os registros!"
    );
  }
};

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);
    if (data) {
      return data;
    }
    return new Error("Erro ao listar os registros!");
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao consultar registro!");
  }
};

const create = async (
  dados: Omit<IDetalheCidade, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post(`/cidades`, dados);
    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar registro!");
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao criar o registro!");
  }
};

const updateById = async (
  id: number,
  dados: IDetalheCidade
): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as Error).message || "Erro ao atualizar o registro!"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao apagar o registro!");
  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
