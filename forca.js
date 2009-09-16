//jogo da forca
//to-do: 
//painel de status: chances, vitoria, derrota (qual era a palavra), etc. (tirar os alerts toscos!)
//fases: niveis de dificuldade por numero de letras
//categorias (coisas nerds)

var JogoDaForca= function(_gerador, _ocultador, _imagem) {
	var gerador= _gerador;
	var ocultador= _ocultador;
	var imagem= _imagem;
	var chances;
	var acabou;
	
	this.novo= function() {
		mostrarAreaDoJogo();
		palavra= gerador.meDeUmaPalavra();
		ocultador.ocultar(palavra);
		chances= 6;
		acabou= false;
		imagem.exibe();
	};
	
	this.palpite= function(letra) {
		if(acabou)
			return;
		if(ocultador.revela(letra)) {
			if(ocultador.revelouTudo()) {
				acabou= true;
				alert('ganhou');
			}
		}			
		else {
			imagem.exibeProxima();
			chances--;
			if(chances == 0) {
				acabou= true;
				alert('perdeu');
			}
		}			
	};
	
	var mostrarAreaDoJogo= function() {
		document.getElementById('area_do_jogo').setAttribute('style', '');
	}
};

var Gerador= function() {
	var palavras= ['DWIGHT', 'PAM', 'JIM', 'MICHAEL'];
	
	this.meDeUmaPalavra= function() {
		sorteada= sortearNumeroEntre(0, palavras.length);
		return palavras[sorteada];
	};
	
	var sortearNumeroEntre= function(menor, maior) {
		return Math.floor((maior-menor-1)*Math.random())+menor;
	};
};

var Imagem= function() {
	var numero;
	var arquivo='http://www.inf.pucrs.br/~ai190536/forca/images/#.jpg';
	
	this.exibe= function() {
		document.getElementById('imagem').src= arquivo.replace('#', numero=0);
	};
	
	this.exibeProxima= function() {
		document.getElementById('imagem').src= arquivo.replace('#', ++numero);
	};
};

var Ocultador= function() {
	var palavra;
	var palavraOculta;
	
	this.ocultar= function(_palavra) {
		palavra= _palavra;
		palavraOculta= '';
		i= 0;
		while(i++ < palavra.length)
			palavraOculta+='_';
		atualiza();	
	};
	
	this.revela= function(letra) {
		if(!tem(letra))
			return false;
			
		i= palavra.indexOf(letra);
		chars= palavraOculta.split('');
		while(i != -1) {
			chars[i] = palavra.charAt(i);
			i= palavra.indexOf(letra, i+1);
		}
		palavraOculta= chars.join('');
		atualiza();
		return true;
	};
	
	this.revelouTudo= function() {
		return palavraOculta.indexOf('_') == -1;
	};
	
	var tem= function(letra) {
		return palavra.indexOf(letra) != -1;
	};
	
	var atualiza= function() {
		document.getElementById('palavra_oculta').innerHTML= palavraOculta;
	};
};

gerador= new Gerador();
ocultador= new Ocultador();
imagem= new Imagem();
var jogo= new JogoDaForca(gerador, ocultador, imagem); 