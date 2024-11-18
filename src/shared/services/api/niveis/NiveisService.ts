import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemDeNivel {
  id: number;
  nomeNivel: string;
}

export interface IDetalheNivel {
  id: number;
  nomeNivel: string;
}

type TNivelComTotalCount = {
  data: IListagemDeNivel[];
  totalCount: number;
  dataTotalItems: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TNivelComTotalCount | Error> => {
  try {
    const { data, headers } = await Api.get(
      `/niveis?_page=${page}&_per_page=${Environment.LIMITE_DE_LINHAS}&nivel=${filter}`
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

const getById = async (id: number): Promise<IDetalheNivel | Error> => {
  try {
    const { data } = await Api.get(`/niveis/${id}`);
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
  dados: Omit<IDetalheNivel, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post(`/niveis`, dados);
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
  dados: IDetalheNivel
): Promise<void | Error> => {
  try {
    await Api.put(`/niveis/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as Error).message || "Erro ao atualizar o registro!"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/niveis/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao apagar o registro!");
  }
};

export const NiveisService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
