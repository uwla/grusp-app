<template>
   <main id="faq">
    <h1>FAQ</h1>

    <h2>Como criar uma conta?</h2>

    <p>Clique no botão  <i>Conta</i>,  no  canto  superior  direito  da  página.
    Aparecerá um menu. Clique em <i>Registrar</i> e será guiado para a página de
    registro. Preencha seu nome e email USP no formulário e escolha uma senha de
    acesso. Após enviar o formulário, um  link  de  confirmação  de  email  será
    enviado  para  seu  email  USP.  Após  clicar  no  link,  sua  conta  estará
    habilitada.</p>

    <h2>Como entrar na conta?</h2>

    <p>Clique no botão  <i>Conta</i>,  no  canto  superior  direito  da  página.
    Aparecerá um menu. Clique em <i>Entrar</i> e será guiado para  a  página  de
    login. Após isto, basta preencher seu email e senha e  clicar  no  botão  de
    entrar.</p>

    <h2>Como registrar um grupo?</h2>

    <p>Entre em sua conta. Clique no botão <i>Criar grupo</i> e será guiado para  o
    formulário. Preencha o formulário. Os únicos campos obrigatórios  são  o  nome,
    descrição e foto do grupo, mas é recomendado preencher os outros campos também.
    Clique em <i>Enviar</i> e o grupo será criado.</p>

    <h2>Como registrar uma nova categoria/tag?</h2>

    <p>Entre em contato conosco conforme descrito na <b-link href="/contato">
    página de contato</b-link> e solicite a adição da tag/categoria.</p>

   </main>
</template>

<script>
import { defineHead } from '../utils'

export default {
    head: defineHead('GRUSP - FAQ',
        'Perguntas frequentes sobre o GRUSP - Grupos USP'),
    name: 'PageFaq'
}
</script>

<style>
#faq {
    text-align: justify;
}
</style>
