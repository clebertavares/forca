//jogo da forca
//to-do: desabilitar letras ja clicadas pra impedir progresso da forca
//to-do: dasabilitar letras apos vitoria ou derrota
//to-do: painel de status: chances, vitoria, derrota, etc.

var JogoDaForca= function(_gerador, _ocultador, _imagem) {
	var gerador= _gerador;
	var ocultador= _ocultador;
	var imagem= _imagem;
	var chances;
	
	this.novo= function() {
		palavra= gerador.meDeUmaPalavra();
		ocultador.ocultar(palavra);
		chances= 6;
		imagem.exibe();
	};
	
	this.palpite= function(letra) {
		if(ocultador.revela(letra)) {
			if(ocultador.revelouTudo())
				alert('ganhou');	
		}			
		else {
			imagem.exibeProxima();
			chances--;
			if(chances == 0)
				alert('perdeu');
		}			
	};
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
	var visivel;
	
	this.ocultar= function(_palavra) {
		palavra= _palavra;
		visivel= '';
		i= 0;
		while(i++ < palavra.length)
			visivel+='_';
		atualiza();	
	};
	
	this.revela= function(letra) {
		if(!tem(letra))
			return false;
			
		i= palavra.indexOf(letra);
		chars= visivel.split('');
		while(i != -1) {
			chars[i] = palavra.charAt(i);
			i= palavra.indexOf(letra, i+1);
		}
		visivel= chars.join('');
		atualiza();
		return true;
	};
	
	this.revelouTudo= function() {
		return visivel.indexOf('_') == -1;
	};
	
	var tem= function(letra) {
		return palavra.indexOf(letra) != -1;
	};
	
	var atualiza= function() {
		document.getElementById('visivel').innerHTML= visivel;
	};
};

gerador= new Gerador();
ocultador= new Ocultador();
imagem= new Imagem();
var jogo= new JogoDaForca(gerador, ocultador, imagem); 