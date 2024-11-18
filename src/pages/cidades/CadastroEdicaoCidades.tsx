import React, { useEffect, useState } from "react";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import * as yup from "yup";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import Swal from "sweetalert2";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import Grid from "@mui/material/Grid";
import { Box, Grid2, LinearProgress, Paper, Typography } from "@mui/material";

interface IHandleSalvar {
  nomeCidade: string;
}

const formValidationSchema: yup.Schema<IHandleSalvar> = yup.object().shape({
  nomeCidade: yup
    .string()
    .required('O campo "Nome" é obrigatório!')
    .min(3, 'O campo "Nome" deve ter no mínimo 3 caracteres!'),
});

export const CadastroEdicaoCidades: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const { formRef } = useVForm();

  useEffect(() => {
    if (id !== "nova") {  
      setIsLoading(true);
      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          Swal.fire({
            title: "Erro!",
            text: result.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          navigate("/cidades");
        } else {
          setNome(result.nomeCidade);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeCidade: "",
      });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: `Você tem certeza que deseja apagar ${nome}?`,
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#1e2733",
      confirmButtonText: "Sim, apagar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        CidadesService.deleteById(id).then((result) => {
          if (result instanceof Error) {
            Swal.fire({
              title: "Erro!",
              text: result.message,
              icon: "error",
              confirmButtonText: "OK",
            });
            navigate("/cidades");
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: `A cidade ${nome} foi excluído com sucesso!`,
            });
            navigate("/cidades");
          }
        })
      }
    });
  };

  const handleSalvar = (dados: IHandleSalvar) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === "nova") {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              Swal.fire({
                title: "Erro!",
                text: result.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: "Sucesso!",
                text: "Registro criado com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                navigate(`/cidades`);
              });
            }
          });
        } else {
          setIsLoading(true);
          CidadesService.updateById(Number(id), {id: Number(id), ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              Swal.fire({
                title: "Erro!",
                text: result.message,
                icon: "error",
                confirmButtonText: "OK",
              }).then(() => {
                navigate(`/cidades`);
              });
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: `Alteração feita com sucesso!`,
              }).then(() => {
                navigate(`/cidades`);
              });
            }
          });
        }
      }).catch((error: yup.ValidationError) => {
        const validationError: { [key: string]: string } = {};

        error.inner.forEach((error) => {
          if(!error.path) return;
          validationError[error.path] = error.message;
        });

        formRef.current?.setErrors(validationError);
      });
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Cidade" : nome}
      barrasDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "novo"}
          aoClicarSalvar={() => formRef.current?.submitForm()}
          aoClicarSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/cidades")}
        />
      }
    >
      <>
        <VForm
          ref={formRef}
          onSubmit={handleSalvar}
          placeholder=""
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        >
          <Box
            margin={1}
            display="flex"
            flexDirection="column"
            component={Paper}
            variant="outlined"
            width="auto"
          >
            <Grid2
              container
              direction="column"
              padding={2}
              spacing={2}
              component="div"
            >
              <Grid2>
                {isLoading && (
                  <Box>
                    <LinearProgress variant="indeterminate" />
                  </Box>
                )}
              </Grid2>

              <Grid2>
                <Typography variant="h6"> Dados </Typography>
              </Grid2>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                  <VTextField
                    fullWidth
                    name="nomeCidade"
                    label="Digite seu nome completo"
                    disabled={isLoading}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid2>
          </Box>
        </VForm>
      </>
    </LayoutBaseDePagina>
  );
};
