# Wordle

Este é um jogo simples e responsivo inspirado no Wordle, feito com HTML, CSS e JavaScript. O objetivo é adivinhar uma palavra de 5 letras em um número limitado de tentativas.

## Tecnologias Utilizadas
- HTML  
- CSS  
- JavaScript  
- Python (para obtenção da lista de palavras)  

## Origem das Palavras
As palavras de 5 letras foram retiradas do site [Dicio](https://www.dicio.com.br/palavras-com-cinco-letras/) utilizando Python e as bibliotecas `requests` e `BeautifulSoup` para raspagem de dados.

## Melhorias a Fazer
1. **Correção na indicação de letras repetidas**: Atualmente, se a palavra contém apenas um 'A' e o jogador inserir dois 'A', ambos podem ser destacados em amarelo. Isso precisa ser ajustado para refletir corretamente a presença da letra na palavra oculta.  
   
2. **Restrição de entradas**: Permitir apenas palavras válidas em português, impedindo entradas com caracteres inválidos ou palavras inexistentes.  

3. **Opção de reiniciar o jogo**: Implementar uma funcionalidade para reiniciar o jogo sem precisar recarregar a página.  

## Como Jogar
1. Digite uma palavra de 5 letras.  

2. Pressione Enter para validar a tentativa.  
   
3. As cores indicarão a precisão da tentativa:  
   - **Verde**: Letra correta na posição correta.  
   - **Amarelo**: Letra correta na palavra, mas na posição errada.  
   - **Cinza**: Letra não encontrada na palavra.  

4. Continue tentando até acertar a palavra ou esgotar as tentativas.  

## Como Executar
Para rodar o jogo corretamente, será necessário um servidor local. Você pode iniciar um servidor HTTP simples com Python:

### Usando Python 3:
No terminal ou prompt de comando, navegue até a pasta do projeto e execute:

```sh
python -m http.server 8000
```
Depois, abra o navegador e acesse:
```
http://localhost:8000
```


### Usando Node.js:
Se estiver usando Node.js, pode instalar e rodar o live-server:
```sh
npm install -g live-server
live-server
```

## Contribuição
Sinta-se à vontade para sugerir melhorias ou contribuir com o projeto!

---
Desenvolvido por Sofia Alves Toreti
