## Colocar as fotos

1. Abra `assets/fotos`.
2. Coloque as fotos dela nessa pasta.
3. Use nomes simples, sem espaços e sem acentos, como:
   - `foto-sorrindo.jpg`
   - `primeira-foto.png`
   - `foto-favorita.webp`
4. No `content.js`, substitua o caminho, por exemplo:

```js
src: "assets/fotos/foto-sorrindo.jpg"
```

Para a capa, altere:

```js
image: "assets/fotos/capa.jpg"
```

Fotos verticais funcionam melhor na galeria. Para a capa, prefira uma imagem horizontal ou uma foto que ainda fique boa com corte lateral.

## Colocar a música

1. Renomeie o áudio para `musica.mp3`.
2. Coloque-o em `assets/musica`.
3. O caminho já está configurado no `content.js`.

Também é possível usar outro nome:

```js
file: "assets/musica/nossa-musica.mp3"
```

A música tenta começar depois que ela toca no botão de abertura. Celulares não permitem som automático antes de uma interação.

## Como testar

### Opção simples

Abra `index.html` no navegador.

### Opção recomendada

Use o Visual Studio Code com a extensão **Live Server**:

1. abra a pasta do projeto no VS Code;
2. clique com o botão direito em `index.html`;
3. selecione **Open with Live Server**.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos e pastas deste projeto.
3. Abra `Settings` → `Pages`.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione `main` e `/ (root)`.
6. Salve.

## Privacidade

GitHub Pages não é um local privado. Não publique:

- fotos íntimas;
- telefone;
- endereço;
- escola;
- nome completo, se ela não permitir;
- prints com informações pessoais;
- conversas que ela não gostaria de ver expostas.

Um código ou senha feito apenas com JavaScript não protege realmente os arquivos.

## Estrutura

- `index.html`: estrutura geral;
- `styles.css`: estética e adaptação para celular;
- `app.js`: navegação, gestos, música e animações;
- `content.js`: todos os textos e caminhos das fotos;
- `assets/fotos`: imagens;
- `assets/musica`: música.
