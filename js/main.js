//Software para dimensionamento de equipamentos e projeto de sistemas fotovoltaicos
//Dimensionamento da potência do sistema em até 10kW
//A diferença entre consumo e custo de disponibilidade pode ser somente maior que 52



//modelo para um painel solar fotovolaico
var painel =  { "potencia":0,
                 "Vmax":0,
                 "Vmin":0,
                 "correnteSC":0,
                 "nome":"",
                 "preco":0,
                 "imagem":"<center><img src='imagens/canadian.png' class='img-responsive center-block' alt='tabela'><center>"
               };
//modelo para o painel inserido pelo usuário
var painel1 =  { "potencia":0,
                "Vmax":0,
                "Vmin":0,
                "correnteSC":0,
                "nome":"",
                "preco":0,
                "imagem":"<center><img src='imagens/yingli.png' class='img-responsive center-block' alt='painel'></center>"
                };

var painel270 =  { "potencia":270,
                    "Vmax":37.9,
                    "Vmin":32.5,
                    "correnteSC":9.32,
                    "nome":"Canadian CSI CS6K-270P",
                    "preco":590,
                    "imagem":"<center><img src='imagens/canadian.png' class='img-responsive center-block' alt='painel'></center>"
                  };


var painel255 =  { "potencia":255,
                    "Vmax":37.4,
                    "Vmin":32.5,
                    "correnteSC":9,
                    "nome":"Canadian CSI CS6P-255P",
                    "preco":875,
                    "imagem":"<center><img src='imagens/canadian.png' class='img-responsive center-block' alt='painel'></center>"
                  };

var painel150 =  { "potencia":150,
                    "Vmax":37.4,
                    "Vmin":32.5,
                    "correnteSC":8.61,
                    "nome":"Yingli Solar YL150P",
                    "preco":415,
                    "imagem":"<center><img src='imagens/yingli.png' class='img-responsive center-block' alt='painel'></center>"
                  };

//Modelo(classe) para o arranjo fotovolaico
var arranjo = { "numSerie":0,
                "numParalelo":1,
                "Vmax":0,
                "Vmin":0,
                "Imax":0,
                "Imin":0, };

var investimento = { "tma":0,               //taxa mínima de atratividade - Poupança: 6.1% ,LCI: 9.8% -Anual
                     "decaimentoPainel":0,  //Decaimento anual da produção do painéis - 0.08
                     "arrayDecaimento":[],
                     "arrayEnergia":[],
                     "arrayTarifa":[],
                     "arrayCaixa":[],
                     "arrayCaixaPresente":[],
                     "tarifa":0.8,            //Tarifa de energia - R$/kWh - 0.80
                     "ajusteTarifa":0,      //Taxa de correção anual da tarida de energia 0.026 - 2.6%
                     "payback":0,           //Payback simples
                     "paybackDescontado":0, //Payback Descontado
                     "vpl":0,               //Valor presente líquido
                     "tir":0,               //Taxa Interna de Retorno
                     "custoPaineis":0,               //Custo total dos paineis
                     "custoInversor":0,             //Custo total dos Inversores
                     "precoCabeamento":0.75,          //preço da cabeamento em R$/kW;
                     "custoCabeamento":0,          //Custo total com cabeamento
                     "precoEstrutura":1.25,          //preço da estrutura em R$/kW;
                     "custoEstrutura":0,          //Custo total com estrutura
                     "custoTotal":0,          //Custo Total do sistema
                   };

//Modelo(classe) para o sistema fotovolaico
 var sistema = { "potencia":0,
                 "potenciaNecessaria":0,
                 "disponibilidade":0,                //define o custo de disponibilidade do padrão de entrada [kWh]
                 "numPaineis":0,
                 "numInversores":1,
                 "TD":0.75,                         //Taxa de desempenho a priori é 0,75
                 "HSP":0,                           //Horas de Sol Pleno médias em Juiz de Fora. Medida em kWh/m² para um dia.
                 "consumoMensal":0,                 //Consumo médio Mensal em kWh
                 "consumoDiario":0,                 //Consumo médio diário em Wh
                 "MPPTativo":false,                 //Verifica está na faixa MPPT
                 "condicaoVmin":false,              //Verifica Vmin do arranjo com o Inversor
                 "condicaoVmax":false,              //Verifica Vmax do arranjo com o Inversor
                 "condicaoImax":false,              //Verifica Imax do arranjo com o Inversor
                 "condicaopotMaxEntrada":false,     //Verifica potencia do arranjo com o Inversor
                 "condicao":false,                  //Verifica se todos os requisitos estão corretos
                 "tester":false,                    //Variável teste
                 "precoTotal":0,                    //Preço do sistema
                 "energiaMensal":0,                        //Energia produzida mensalmente
                 "energiaAnual":0                        //Energia produzida anualmente
                };

var tutorial = { "potenciaNecessaria":0,
                "energiaMediaDiaria":0,                //define o custo de disponibilidade do padrão de entrada [kWh]
                "difMensalDisponibilidade":0,
                "difDiariaDisponibilidade":0,
                "numPaineis":0,
                "numInversores":1,
                "TD":0.75,                         //Taxa de desempenho a priori é 0,75
                "HSP":0,                           //Horas de Sol Pleno médias em Juiz de Fora. Medida em kWh/m² para um dia.
                "consumoMensal":0,                 //Consumo médio Mensal em kWh
                "consumoDiario":0,                 //Consumo médio diário em Wh
                "MPPTativo":false,                 //Verifica está na faixa MPPT
                "condicaoVmin":false,              //Verifica Vmin do arranjo com o Inversor
                "condicaoVmax":false,              //Verifica Vmax do arranjo com o Inversor
                "condicaoImax":false,              //Verifica Imax do arranjo com o Inversor
                "condicaopotMaxEntrada":false,     //Verifica potencia do arranjo com o Inversor
                "tma":0,                           //Taxa minima de atratividade
                "decaimentoPainel":0,
                "tester":false,                    //Variável teste
                "precoTotal":0,                    //Preço do sistema
                "energiaMensal":0,                        //Energia produzida mensalmente
                "energiaAnual":0                        //Energia produzida anualmente
               };

//Criação de um vetor para verificar o Máximo VPL dado a quantidade de paineis,inversores
var otimizacao = {    "tma":0,               //taxa mínima de atratividade - Poupança: 6.1% ,LCI: 9.8% -Anual
                      "numeroPaineis":[],   //array variando de 1 até número máximo de paineis
                      "potenciaArranjo":[],
                      "arrayCustoTotal":[],
                      "decaimentoPainel":0,  //Decaimento anual da produção do painéis - 0.07
                      "arrayDecaimento":[],
                      "arrayEnergia":[],
                      "arrayTarifa":[],
                      "arrayCaixa":[],
                      "arrayCaixaPresente":[],
                      "tarifa":0.8,            //Tarifa de energia - R$/kWh - 0.80
                      "ajusteTarifa":0,      //Taxa de correção anual da tarida de energia 0.03 - 3%
                      "payback":[],           //Payback simples
                      "paybackDescontado":[], //Payback Descontado
                      "vpl":[],               //Valor presente líquido
                      "todosVpl":[],
                      "tir":[],               //Taxa Interna de Retorno
                      "custoPaineis":0,               //Custo total dos paineis
                      "custoInversor":0,             //Custo total dos Inversores
                      "precoCabeamento":0,          //preço da cabeamento em R$/kW;
                      "custoCabeamento":0,          //Custo total com cabeamento
                      "precoEstrutura":0,          //preço da estrutura em R$/kW;
                      "custoEstrutura":0,          //Custo total com estrutura
                      "custoTotal":[],          //Custo Total do sistema
                    };





//Modelo(classe) para o Inversor
var inversor     = {  "potMaxEntrada":0,
                      "VmpptMin":0,
                      "VmpptMax":0,
                      "correnteMax":0,
                      "VMaxEntrada":0,
                      "VMinStart":0,
                      "preco":0,
                      "imagem":"<center><img src='imagens/canadian.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor260 = { "nome":"Microinversor i-Energy GT260",
                    "potMaxEntrada":265,
                    "VmpptMin":30,
                    "VmpptMax":50,
                    "correnteMax":10,
                    "VMaxEntrada":59,
                    "VMinStart":25,
                    "preco":1700,
                    "imagem":"<center><img src='imagens/inversor260.png' class='img-responsive center-block' alt='painel'></center>"
                  };

//determinar preço
var inversor1000 = { "nome":"ecoS-1000 220V ",
                     "potMaxEntrada":1000,
                     "VmpptMin":125,
                     "VmpptMax":320,
                     "correnteMax":9,
                     "VMaxEntrada":320,
                     "VMinStart":45,
                     "preco":6290,
                     "imagem":"<center><img src='imagens/inversor2000dois.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor1300 = { "nome":"Inversor SMA Sunny Boy SB 1300TL-10",
                     "potMaxEntrada":1400,
                     "VmpptMin":115,
                     "VmpptMax":480,
                     "correnteMax":12,
                     "VMaxEntrada":600,
                     "VMinStart":120,
                     "preco":6290,
                     "imagem":"<center><img src='imagens/inversor1300.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor1500 = { "nome":"Inversor Fronius Galvo 1.5-1",
                     "potMaxEntrada":1600,
                     "VmpptMin":120,
                     "VmpptMax":335,
                     "correnteMax":13.3,
                     "VMaxEntrada":420,
                     "VMinStart":140,
                     "preco":8200,
                     "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                     };

var inversor1600 = { "nome":"Inversor B&B Power - SF1600TL",
                    "potMaxEntrada":1600,
                    "VmpptMin":120,
                    "VmpptMax":530,
                    "correnteMax":13,
                    "VMaxEntrada":550,
                    "VMinStart":120,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1600.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor1800 = { "nome":"PHB 1500-SS",
                    "potMaxEntrada":1800,
                    "VmpptMin":125,
                    "VmpptMax":400,
                    "correnteMax":12,
                    "VMaxEntrada":450,
                    "VMinStart":125,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1800.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor1800dois = { "nome":"SE-TL1.5K",
                    "potMaxEntrada":1800,
                    "VmpptMin":100,
                    "VmpptMax":425,
                    "correnteMax":11,
                    "VMaxEntrada":480,
                    "VMinStart":150,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/SE.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor1850 = { "nome":"SF1600TL",
                    "potMaxEntrada":1850,
                    "VmpptMin":120,
                    "VmpptMax":500,
                    "correnteMax":13,
                    "VMaxEntrada":550,
                    "VMinStart":100,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1850.png' class='img-responsive center-block' alt='painel'></center>"
                    };


var inversor2000 = { "nome":"Inversor Fronius Galvo 2.0-1",
                      "potMaxEntrada":2140,
                      "VmpptMin":120,
                      "VmpptMax":335,
                      "correnteMax":17.8,
                      "VMaxEntrada":420,
                      "VMinStart":140,
                      "preco":8400,
                      "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                      };

var inversor2000dois = { "nome":"ecoS-2000",
                     "potMaxEntrada":2000,
                     "VmpptMin":125,
                     "VmpptMax":320,
                     "correnteMax":9,
                     "VMaxEntrada":320,
                     "VMinStart":45,
                     "preco":6290,
                     "imagem":"<center><img src='imagens/inversor1000.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor2300 = { "nome":"SE-TL2K",
                   "potMaxEntrada":1800,
                   "VmpptMin":100,
                   "VmpptMax":425,
                   "correnteMax":12,
                   "VMaxEntrada":480,
                   "VMinStart":150,
                   "preco":8200,
                   "imagem":"<center><img src='imagens/SE.png' class='img-responsive center-block' alt='painel'></center>"
                   };

 var inversor2500 = { "nome":"SF2200TL",
                     "potMaxEntrada":2500,
                     "VmpptMin":170,
                     "VmpptMax":500,
                     "correnteMax":15,
                     "VMaxEntrada":550,
                     "VMinStart":100,
                     "preco":8200,
                     "imagem":"<center><img src='imagens/inversor1850.png' class='img-responsive center-block' alt='painel'></center>"
                     };

var inversor2650 = { "nome":"Inversor Fronius Galvo 2.5-1",
                   "potMaxEntrada":2650,
                   "VmpptMin":165,
                   "VmpptMax":440,
                   "correnteMax":16.6,
                   "VMaxEntrada":550,
                   "VMinStart":185,
                   "preco":8600,
                   "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor3000 = { "nome":"Inversor Grid-tie Fronius Primo 3.0-1",
                      "potMaxEntrada":3000,
                      "VmpptMin":200,
                      "VmpptMax":800,
                      "correnteMax":20.7,
                      "VMaxEntrada":1000,
                      "VMinStart":80,
                      "preco":8400,
                      "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                      };

var inversor3000dois = { "nome":"Inversor B&B Power - SF3000TL",
                    "potMaxEntrada":3000,
                    "VmpptMin":210,
                    "VmpptMax":500,
                    "correnteMax":15,
                    "VMaxEntrada":550,
                    "VMinStart":120,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1600.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor3200 = { "nome":"PHB 3000-SS",
                    "potMaxEntrada":3200,
                    "VmpptMin":125,
                    "VmpptMax":450,
                    "correnteMax":18,
                    "VMaxEntrada":500,
                    "VMinStart":125,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1800.png' class='img-responsive center-block' alt='painel'></center>"
                    };


var inversor3400 = { "nome":"SE-TL3KB",
                   "potMaxEntrada":3400,
                   "VmpptMin":120,
                   "VmpptMax":500,
                   "correnteMax":17,
                   "VMaxEntrada":580,
                   "VMinStart":150,
                   "preco":8200,
                   "imagem":"<center><img src='imagens/SE.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor3500 = { "nome":"SF3000TL",
                    "potMaxEntrada":3500,
                    "VmpptMin":210,
                    "VmpptMax":500,
                    "correnteMax":15,
                    "VMaxEntrada":550,
                    "VMinStart":100,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1850.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor4000 = { "nome":"Inversor Fronius Primo 4.0-1",
                     "potMaxEntrada":4000,
                     "VmpptMin":210,
                     "VmpptMax":800,
                     "VMaxEntrada":1000,
                     "correnteMax":12,
                     "VMinStart":80,
                     "preco":9300,
                     "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor4500 = { "nome":"SE-TL4KB",
                   "potMaxEntrada":4500,
                   "VmpptMin":120,
                   "VmpptMax":500,
                   "correnteMax":20,
                   "VMaxEntrada":580,
                   "VMinStart":150,
                   "preco":8200,
                   "imagem":"<center><img src='imagens/SE.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor5000 = {  "nome":"Inversor Fronius Primo 5.0-1",
                      "potMaxEntrada":5000,
                      "VmpptMin":240,
                      "VmpptMax":800,
                      "VMaxEntrada":1000,
                      "correnteMax":12,
                      "VMinStart":80,
                      "preco":10300,
                      "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                   };

//dois mppt - em processo pelo inmetro
var inversor5000dois = { "nome":"ecoS-5000",
                    "potMaxEntrada":2000,
                    "VmpptMin":125,
                    "VmpptMax":400,
                    "correnteMax":9,
                    "VMaxEntrada":400,
                    "VMinStart":90,
                    "preco":6290,
                    "imagem":"<center><img src='imagens/inversor2000dois.png' class='img-responsive center-block' alt='painel'></center>"
                  };


var inversor5000tres = { "nome":"Inversor B&B Power - SF5000TL",
                    "potMaxEntrada":5000,
                    "VmpptMin":175,
                    "VmpptMax":500,
                    "correnteMax":15,
                    "VMaxEntrada":500,
                    "VMinStart":120,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1600.png' class='img-responsive center-block' alt='painel'></center>"
                    };

//dois mppt
var inversor5200 = { "nome":"SE-TL5K",
                   "potMaxEntrada":5200,
                   "VmpptMin":125,
                   "VmpptMax":500,
                   "correnteMax":16,
                   "VMaxEntrada":580,
                   "VMinStart":150,
                   "preco":8200,
                   "imagem":"<center><img src='imagens/SE.png' class='img-responsive center-block' alt='painel'></center>"
                   };


var inversor5400 = { "nome":"PHB 4600-SS",
                    "potMaxEntrada":5400,
                    "VmpptMin":125,
                    "VmpptMax":550,
                    "correnteMax":20,
                    "VMaxEntrada":580,
                    "VMinStart":125,
                    "preco":8200,
                    "imagem":"<center><img src='imagens/inversor1800.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor6000 = { "nome":"Inversor Fronius Primo 6.0-1",
                     "potMaxEntrada":6000,
                     "VmpptMin":240,
                     "VmpptMax":800,
                     "VMaxEntrada":1000,
                     "correnteMax":18,
                     "VMinStart":80,
                     "preco":12000,
                     "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor7000 = { "nome":"Inversor SMA Sunny MiniCentral SMC 7000HV-11",
                      "potMaxEntrada":7500,
                      "VmpptMin":335,
                      "VmpptMax":560,
                      "VMaxEntrada":800,
                      "correnteMax":23,
                      "VMinStart":400,
                      "preco":14400,
                      "imagem":"<center><img src='imagens/inversor7000.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor8000 = {  "nome":"Inversor Fronius IG Plus 100V-1",
                      "potMaxEntrada":8520,
                      "VmpptMin":230,
                      "VmpptMax":500,
                      "VMaxEntrada":600,
                      "correnteMax":37,
                      "VMinStart":260,
                      "preco":14400,
                      "imagem":"<center><img src='imagens/inversor8000.png' class='img-responsive center-block' alt='painel'></center>"
                      };

var inversor9000 = { "nome":"Inversor SMA SB 9000TLUS-10 Sunny Boy Grid Tie",
                     "potMaxEntrada":11250,
                     "VmpptMin":300,
                     "VmpptMax":480,
                     "VMaxEntrada":600,
                     "correnteMax":31,
                     "VMinStart":360,
                     "preco":16000,
                     "imagem":"<center><img src='imagens/inversor9000.png' class='img-responsive center-block' alt='painel'></center>"
                     };





//vetor com as potências disponíveis para inversores
var inversorLista = [inversor1000,inversor1300,inversor1500,inversor1600,inversor1800,inversor1800dois,inversor1850,inversor2000,inversor2000dois,inversor2300,inversor2500,inversor2650,inversor3000,inversor3000dois,inversor3200,inversor3400,inversor3500,inversor4000,inversor5000,inversor4500,inversor5000,inversor5000tres,inversor5200,inversor5400,inversor6000,inversor7000,inversor8000,inversor9000];
var possiveisInversores = [];
//intervalo em Watts
var intervalo = 300; //Pega inversores com abrangência de potNecessaria +- intervalo


//Função para exportar para PDF
function exportarInvestimento(){
  var doc = new jsPDF()
  var conteudo =  document.getElementById("inverstimento-pdf").textContent;
  //doc.text('Hello world!', 10, 10)
  doc.setFontSize(14)
  //doc.text(conteudo,20,20)
  doc.text("Análise de Investimento \n\nCusto total dos painéis:  R$"+investimento.custoPaineis+" \nCusto total dos Inversores: R$"+investimento.custoInversor+ "\nCusto estimado com a Estrutura: R$"+investimento.custoEstrutura+ "\nCusto estimado com Cabeamento e Proteção: R$"+investimento.custoCabeamento+"\nCusto total do sistema: R$"+investimento.custoTotal+"\nTaxa mínima de atratividade: "+tutorial.tma+"% ao ano \nValor Presente Líquido: R$"+investimento.vpl.toFixed(2)+"\nTaxa Interna de Retorno: "+investimento.tir.toFixed(2)+"% ao ano \nPayback: "+investimento.payback.toFixed(2)+" anos" ,20,20)
  doc.save('investimento.pdf')
}

function exportarArranjo(){
  var doc = new jsPDF()
  doc.setFontSize(14)
  var conteudo =  document.getElementById("arranjo-pdf").textContent;
  doc.text("Arranjo dos panéis \n\nPainéis em série:"+arranjo.numSerie+" \nStrings em paralelo: "+arranjo.numParalelo+ "\nPotência do arranjo: "+sistema.potencia+ "W\nVmax do arranjo FV: "+arranjo.Vmax.toFixed(2)+"V\nVmin do arranjo FV: "+arranjo.Vmin.toFixed(2)+"V\nCorrente do arranjo FV: "+painel.correnteSC*arranjo.numParalelo+"A \n\n\nPainel: "+painel.nome+"\n\nPotência do painel: "+painel.potencia+" W \nTensão máxima: "+painel.Vmax+"V\nTensão mínima: "+painel.Vmin+ "V\nCorrente de curto circuito: "+painel.correnteSC+ "A\n\n\nInversor: "+inversor.nome+"\n\nPotência máxima de entrada: "+inversor.potMaxEntrada+"W \nTensão máxima de entrada: "+inversor.VMaxEntrada+"V\nFaixa MPPT: "+inversor.VmpptMin+"V ~ "+ inversor.VmpptMax+"V\nTensão mínima para inicialização: "+inversor.VMinStart+"V\nCorrente máxima de entrada: "+inversor.correnteMax+"A " ,20,20)
  //doc.text(conteudo,30,30)
  doc.save('arranjo.pdf')
}

//escolhe o painel selecionado no dropdown menu
function choosePainel(painelName){
  painel = painelName;
  document.getElementById("dropdownMenuPainel").innerHTML = ""+ painel.nome;
}


//função para dar refresh na página
function reload() {
    location.reload();
}


//escolhe o padrão de entrada no dropdown menu
//determina o custo de disponibilidade de cada entrada
function custoDisponibilidade(padrao){
  if(padrao =="mono"){
    sistema.disponibilidade = 30;
    document.getElementById("dropdownMenu2").innerHTML = "Monofásico";
    console.log(sistema.disponibilidade);
  }
  if(padrao == "bi"){
    sistema.disponibilidade = 50;
    document.getElementById("dropdownMenu2").innerHTML = "Bifásico";
    console.log(sistema.disponibilidade);
  }
  if(padrao == "tri"){
    sistema.disponibilidade = 100;
    document.getElementById("dropdownMenu2").innerHTML = "Trifásico";
    console.log(sistema.disponibilidade);
  }
}

//Pega os dados do painel inserido pelo usuário
function dadosPainel() {
     alert("Dados do painel prontos para dimensionamento!");
     painel1.potencia = document.getElementById("painelpotencia").value;
     painel1.Vmax = document.getElementById("painelvmax").value;
     painel1.Vmin = document.getElementById("painelvmin").value;
     painel1.correnteSC = document.getElementById("correntesc").value;
     painel1.preco = document.getElementById("preco").value;
     painel1.nome = document.getElementById("painelnome").value;
     painel = painel1;
     document.getElementById("dropdownMenu1").innerHTML = ""+ painel1.nome;
     console.log(painel1.nome);
}

//Função para escolher o Inversor dentro do array possiveisInversores e colocar seu nome e potência no dropdownMenuInversor
function escolheInversor(posicao){
  inversor = possiveisInversores[posicao];
  document.getElementById("dropdownMenuInversor").innerHTML = ""+ inversor.nome+" Potência: "+inversor.potMaxEntrada+" W";
}


//------------Primeira parte do código---------------------//
//---------------Interação do usuário-------------------------//
//---------Processar dados iniciais fornecidos---------------------///
//Recebe valores inseridos pelo usuário
function getInputs(){
  clean();
  sistema.HSP = document.getElementById("hsp").value;
  sistema.consumoMensal = document.getElementById("consumo").value;
  investimento.tarifa = document.getElementById("tarifa").value;
  investimento.tma = document.getElementById("tma").value;
  investimento.tma = investimento.tma/100;
  tutorial.tma = investimento.tma*100;
  //run()

  //-------------Cálculo da potência do Sistema-----------------//
  //Consumo médio diário em Wh
  sistema.consumoDiario = 1000*(sistema.consumoMensal-sistema.disponibilidade)/30;

  //calcula a potência para produzir a energia necessária
  potInteira = (sistema.consumoDiario/sistema.TD)/sistema.HSP;
  sistema.potNecessaria = potInteira;
  document.getElementById("potencia-necessaria").innerHTML = "Potência necessária = "+sistema.potNecessaria.toFixed(2)+"W";


//-------------------Acima de 100.000W de potência é Minigeração------------//
  if(potInteira>100000){
    alert("Ultrapassou o limite de potência para microgeração! Utilizar outros dados!");
  }

  //-------------Verifica se há inversores capazes de suprir a demenda de potência---------//
  if( (potInteira/3) > inversorLista[inversorLista.length-1].potMaxEntrada){
    alert("Não há no banco de dados inversor que atenda as características!");
  }


  //Número de inversores inicial
    sistema.numInversores = 1;
    //MUDAR POTINTEIRA -> TRANSFORMAR EM POTENCIA NECESSARIA
    //E TRANSFORMAR EM POTENCIA PARA CALCULO
    //-------NESTE CASO SE potNecessaria > 10000 O SISTEMA USARÁ 3 INVERSORES MONOFÁSICOS---------//
    if(potInteira >= 10000){
      potInteira = potInteira/3;
      sistema.numInversores = 3;
      console.log("Potencia necessaria: "+potInteira);
    }

  //-------------Criando Array com possíveis Inversores dentro de um intervalo determinado-------//
    var limiteInferior = sistema.potNecessaria-intervalo;
    var limiteSuperior = sistema.potNecessaria+intervalo;

    for(i = inversorLista.length-1; i>=0;i--){
    //  possiveisInversores.push(1);
    //(limiteInferior) >=0    (verifica se limiteInferior é positivo)
    //(limiteInferior) < inversorLista[i].potMaxEntrada  (verifica se a potencia do inversor é maior que o limiteInferior)
    //(limiteSuperior) > inversorLista[i].potMaxEntrada  (verifica se a potencia do inversor é menor que o limiteSuperior)
      if( (limiteInferior)>=0 && (limiteInferior< inversorLista[i].potMaxEntrada) && (limiteSuperior>inversorLista[i].potMaxEntrada) ){
            console.log(""+inversorLista[i].nome +":  "+  inversorLista[i].potMaxEntrada);
            possiveisInversores.push(inversorLista[i]);
            //inversor = inversorLista[i]
      }
      // else{
      //   if( (sistema.potNecessaria+intervalo)>inversorLista[i].potMaxEntrada){
      //     possiveisInversores.push(inversorLista[i]);
      //   }
      // }
    }

    //Coloca os possíveis inversores no dropdownMenu
    //inversor = inversorLista[i];
    for(i=0;i<possiveisInversores.length;i++){
        $('#dropdown-inversor').append('<li class ="inv"><a href="#" onclick="escolheInversor('+i+')">'+possiveisInversores[i].nome+' Potência: '+possiveisInversores[i].potMaxEntrada+'W</a></li>');
    }

}
//---------------Fim da primeira parte do programa ---------------//


//----------------Início da SEGUNDA PARTE do programa ------------------//
// ------- Dimensionar o sistema a partir da escolha do inversor e dos painéis ---------------//
sistema.disponibilidade = 0;
//início da função run()
function run(){

painel.preco = document.getElementById("preco-painel").value;
inversor.preco = document.getElementById("preco-inversor").value;
investimento.custoCabeamento = document.getElementById("preco-cabeamento").value;
investimento.custoEstrutura = document.getElementById("preco-estrutura").value;
investimento.custoCabeamento = investimento.custoCabeamento/1;
investimento.custoEstrutura = investimento.custoEstrutura/1;
  //calculo do numero de paineis
  numPaineisDecimal = (potInteira / painel.potencia) -0.5;
  sistema.numPaineis =Math.round(numPaineisDecimal);
  sistema.potencia = sistema.numPaineis*painel.potencia;

  if(inversor.potMaxEntrada<potInteira){
    numPaineisDecimal = (inversor.potMaxEntrada / painel.potencia)-0.5;
    sistema.numPaineis =Math.round(numPaineisDecimal);
    sistema.potencia = sistema.numPaineis*painel.potencia;
    alert("bla");
  }


  //-----------FIM------///

  console.log("------------------------------------------");
  console.log("Verificando arranjo, primeira tentativa...");

  //-------------------CASAMENTO-------------------//
  //**implementar numero de paineis serie e paralelo
  //**implementar correntes do arranjo

//------------------INÍCIO DA PRIMEIRA TENTATIVA DE FORMAR O ARRANJO-------------------///
  //combinando o arranjo em série e verificando os requisitos tecnicos do Inversor escolhido
  arranjo.numSerie = sistema.numPaineis;
  arranjo.Vmax = arranjo.numSerie*painel.Vmax;
  arranjo.Vmin = arranjo.numSerie*painel.Vmin;
  arranjo.Imax = arranjo.numParalelo*painel.correnteSC;

  //Verifica a faixa MPPT
  if(arranjo.Vmax<inversor.VmpptMax && arranjo.Vmin>inversor.VmpptMin){
    console.log("teste1:MPPT ativo! ");
    sistema.MPPTativo = true;
  }

  //Verifica se a potência do arranjo é menor que a potência de entrada do inversor
  if(inversor.potMaxEntrada>=sistema.potencia){
      console.log("teste1:Potencia de entrada do Inversor ok!");
      sistema.condicaopotMaxEntrada = true;
  }

  //Verifica os limites de tensão e corrente do Inversor com o arranjo
  if(arranjo.Vmin>inversor.VMinStart){
    console.log("teste1:Tensão de inicialização ok!");
    sistema.condicaoVmin = true;
  }
  if(arranjo.Vmax<inversor.VMaxEntrada){
    console.log("teste1:Vmax do arranjo ok!");
    sistema.condicaoVmax = true;
  }
  if(arranjo.Imax<inversor.correnteMax){
    console.log("teste1:Corrente de entrada do inversor ok!");
    sistema.condicaoImax = true;
  }

  //verifica se todas as condições anteriores foi atendida
  if(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax ){
    sistema.condicao = true;
    console.log("teste1:casamento ok!");
  }


//------------------FIM DA PRIMEIRA TENTATIVA DE FORMAR O ARRANJO-------------------///
  arranjo.numParalelo = 1;


  //------------------INÍCIO DA SEGUNDA TENTATIVA DE FORMAR O ARRANJO-------------------///
  //combinando o arranjo em série e paralelo, caso a primeira tentativa, de ligá-los em série seja falha
  //zerando as condições para testá-las novamente
  if(sistema.condicao == false){
    sistema.condicaoImax = false;
    sistema.condicaoVmax = false;
    sistema.condicaoVmin = false;
    sistema.MPPTativo = false;
    sistema.condicaopotMaxEntrada = false;

    console.log("Verificando arranjo, segunda tentativa...");
    // setando a menor tensão do inversor
    if(inversor.VMinStart>inversor.VmpptMin){
      inversor.VmpptMin = inversor.VMinStart;
    }

    //teste************************************************AQUIIIII
    // if(inversor.potMaxEntrada<potInteira){
    //   numPaineisDecimal = inversor.potMaxEntrada / painel.potencia;
    //   sistema.numPaineis =Math.round(numPaineisDecimal);
    //   sistema.potencia = sistema.numPaineis*painel.potencia;
    //   alert("bla");
    // }
    //-------------Determinação do arranjo---------------Estudar----------//
    //Determina o número de painéis em série do Arranjo
    //Nesta tentativa será baseada em atingir o nível mínimo de tensão do inversor
    arranjo.numSerie = Math.round( (inversor.VmpptMin/painel.Vmin) - 0.5) + 1;
    arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
    //Afirma que é necessário uma string de painéis
    if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
        arranjo.numParalelo = 1;
    }

    //diferença entre a potencia do arranjo até agora e a potencia necessaria(ou)pontencia máxima de entrada do inversor
    //para isso será criada uma variavel que armazena a menor entre a potencia necessaria(ou)potencia máxima de entrada do inversor escolhido
    var menorPotencia = 0;
    if(potInteira>=inversor.potMaxEntrada){
      menorPotencia = inversor.potMaxEntrada;
    }
    if(potInteira<inversor.potMaxEntrada){
      menorPotencia = potInteira;
    }
    //Criada variável potenciaTemporaria para ajustar o numero de paineis do arranjo
    var potenciaTemporaria = (arranjo.numSerie*arranjo.numParalelo*painel.potencia);
    var diferenca = potenciaTemporaria - menorPotencia;
    diferenca = Math.abs(diferenca);

    // verifica se a diferenca é maior que dois paineis e aproxima o arranjo para o limite superior de tensão do MPPT
    if( diferenca > 2*painel.potencia ){
      arranjo.numSerie = Math.round( (inversor.VmpptMax/painel.Vmax) - 0.5); //para cima
      arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
      if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
          arranjo.numParalelo = 1;
      }
      potenciaTemporaria = (arranjo.numSerie*arranjo.numParalelo*painel.potencia);
      diferenca = potenciaTemporaria - potInteira;
      diferenca = Math.abs(diferenca);
    }

    // verifica se a diferenca é maior que dois paineis novamente e aproxima para baixo
    if( diferenca > 2*painel.potencia ){
      // aproximando para baixo
      arranjo.numSerie = Math.round( (inversor.VmpptMin/painel.Vmin) - 0.5) + 1;
      arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
      if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
          arranjo.numParalelo = 1;
      }
    }

    //-------------FIM da Determinação do arranjo---------------Estudar----------//

    arranjo.Imax = arranjo.numParalelo*painel.correnteSC;
    arranjo.Vmax = arranjo.numSerie*painel.Vmax;
    arranjo.Vmin = arranjo.numSerie*painel.Vmin;

    if(arranjo.Vmax<inversor.VmpptMax && arranjo.Vmin>inversor.VmpptMin){
      console.log("teste2:MPPT ativo!");
      sistema.MPPTativo = true;
    }
    else {
      console.log("teste2: Erro! Não está na faixa do MPPT!");
    }

    if(inversor.potMaxEntrada>=sistema.potencia){
      console.log("teste2:Potencia de entrada do Inversor ok!");
      sistema.condicaopotMaxEntrada = true;
    }
    else {
      console.log("teste2: Erro!Potencia do arranjo maior que o de entrada do Inversor!");
    }

    if(arranjo.Vmin>=inversor.VMinStart){
      console.log("teste2:Tensão de inicialização ok!");
      sistema.condicaoVmin = true;
    }
    else {
      console.log("teste2: Erro!Tensão do arranjo menor que a tensão de inicialização do inversor!");
    }
    if(arranjo.Vmax<inversor.VMaxEntrada){
      console.log("teste2:Vmax do arranjo ok!");
      sistema.condicaoVmax = true;
    }
    else {
      console.log("teste2: Erro!Tensão do arranjo maior que a tensão máxima de entrada do inversor!");
    }

    if(arranjo.Imax<inversor.correnteMax){
      console.log("teste2:Corrente de entrada do inversor ok!");
      sistema.condicaoImax = true;
    }
    else {
      console.log("teste2: Erro!Corrente do arranjo maior que a corrente máxima de entrada do inversor!");
    }
    if(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax ){
      sistema.condicao = true;
      console.log("teste2:casamento ok!");
    }
    if(!(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax )){
      alert("Não foi possível fazer o dimensionamento com o painel selecionado!");
      if(!sistema.MPPTativo){
        alert("Fora da faixa do MPPT");
      }
      if(!sistema.condicaopotMaxEntrada){
        alert("Potência do arranjo maior que a de entrada do Inversor");
      }
      if(!sistema.condicaoVmin){
        alert("Tensão do arranjo menor que a tensão de entrada do Inversor");
      }
      if(!sistema.condicaoVmax){
        alert("Tensão do arranjo maior que a tensão de entrada do Inversor");
      }
      if(!sistema.condicaoImax){
        alert("Corrente do arranjo maior que a corrente de entrada do Inversor");
      }
    }

  }
  //------------------FIM DA SEGUNDA TENTATIVA DE FORMAR O ARRANJO-------------------///

  //------------------INÍCIO DA Terceira TENTATIVA DE FORMAR O ARRANJO-------------------///
  //combinando o arranjo em série e paralelo, caso a primeira tentativa, de ligá-los em série seja falha
  //zerando as condições para testá-las novamente
  if(sistema.condicao == false){
    sistema.condicaoImax = false;
    sistema.condicaoVmax = false;
    sistema.condicaoVmin = false;
    sistema.MPPTativo = false;
    sistema.condicaopotMaxEntrada = false;

    console.log("Verificando arranjo, terceira tentativa...");
    // setando a menor tensão do inversor
    if(inversor.VMinStart>inversor.VmpptMin){
      inversor.VmpptMin = inversor.VMinStart;
    }

    //-------------Determinação do arranjo------------------------//
    //Determina o número de painéis em série do Arranjo
    //Nesta tentativa será baseada em atingir o nível mínimo de correte do inversor
    arranjo.numParalelo = Math.round( (inversor.correnteMax/painel.correnteSC) - 0.5);
    arranjo.numSerie = Math.round(sistema.numPaineis/arranjo.numParalelo);
    //Afirma que é necessário uma string de painéis
    if( Math.round(sistema.numPaineis/arranjo.numParalelo)<1 ){
        arranjo.numSerie = 1;
    }

    //diferença entre a potencia do arranjo até agora e a potencia necessaria(ou)pontencia máxima de entrada do inversor
    //para isso será criada uma variavel que armazena a menor entre a potencia necessaria(ou)potencia máxima de entrada do inversor escolhido
    var menorPotencia = 0;
    if(potInteira>=inversor.potMaxEntrada){
      menorPotencia = inversor.potMaxEntrada;
    }
    if(potInteira<inversor.potMaxEntrada){
      menorPotencia = potInteira;
    }
    //Criada variável potenciaTemporaria para ajustar o numero de paineis do arranjo
    var potenciaTemporaria = (arranjo.numSerie*arranjo.numParalelo*painel.potencia);
    var diferenca = potenciaTemporaria - menorPotencia;
    diferenca = Math.abs(diferenca);

    // verifica se a diferenca é maior que dois paineis e aproxima o arranjo para o limite superior de tensão do MPPT
    if( diferenca > 2*painel.potencia ){
      arranjo.numParalelo = Math.round( (inversor.correnteMax/painel.correnteSC) - 0.5); //para cima
      arranjo.numSerie = Math.round(sistema.numPaineis/arranjo.numParalelo);
      if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
          arranjo.numSerie = 1;
      }
      potenciaTemporaria = (arranjo.numSerie*arranjo.numParalelo*painel.potencia);
      diferenca = potenciaTemporaria - potInteira;
      diferenca = Math.abs(diferenca);
    }

    // verifica se a diferenca é maior que dois paineis novamente e aproxima para baixo
    if( diferenca > 2*painel.potencia ){
      // aproximando para baixo
      arranjo.numParalelo = Math.round( (inversor.correnteMax/painel.correnteSC) - 0.5) + 1;
      arranjo.numSerie = Math.round(sistema.numPaineis/arranjo.numParalelo);
      if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
          arranjo.numParalelo = 1;
      }
    }

    //-------------FIM da Determinação do arranjo-------------------------//

    arranjo.Imax = arranjo.numParalelo*painel.correnteSC;
    arranjo.Vmax = arranjo.numSerie*painel.Vmax;
    arranjo.Vmin = arranjo.numSerie*painel.Vmin;

    if(arranjo.Vmax<inversor.VmpptMax && arranjo.Vmin>inversor.VmpptMin){
      console.log("teste3:MPPT ativo!");
      sistema.MPPTativo = true;
    }
    else {
      console.log("teste3: Erro! Não está na faixa do MPPT!");
    }

    if(inversor.potMaxEntrada>=sistema.potencia){
      console.log("teste3:Potencia de entrada do Inversor ok!");
      sistema.condicaopotMaxEntrada = true;
    }
    else {
      console.log("teste3: Erro!Potencia do arranjo maior que o de entrada do Inversor!");
    }

    if(arranjo.Vmin>=inversor.VMinStart){
      console.log("teste3:Tensão de inicialização ok!");
      sistema.condicaoVmin = true;
    }
    else {
      console.log("teste3: Erro!Tensão do arranjo menor que a tensão de inicialização do inversor!");
    }
    if(arranjo.Vmax<inversor.VMaxEntrada){
      console.log("teste3:Vmax do arranjo ok!");
      sistema.condicaoVmax = true;
    }
    else {
      console.log("teste3: Erro!Tensão do arranjo maior que a tensão máxima de entrada do inversor!");
    }

    if(arranjo.Imax<inversor.correnteMax){
      console.log("teste3:Corrente de entrada do inversor ok!");
      sistema.condicaoImax = true;
    }
    else {
      console.log("teste3: Erro!Corrente do arranjo maior que a corrente máxima de entrada do inversor!");
    }
    if(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax ){
      sistema.condicao = true;
      console.log("teste3:casamento ok!");
    }
    if(!(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax )){
      alert("Não foi possível fazer o dimensionamento com o painel selecionado!");
      if(!sistema.MPPTativo){
        alert("Fora da faixa do MPPT");
      }
      if(!sistema.condicaopotMaxEntrada){
        alert("Potência do arranjo maior que a de entrada do Inversor");
      }
      if(!sistema.condicaoVmin){
        alert("Tensão do arranjo menor que a tensão de entrada do Inversor");
      }
      if(!sistema.condicaoVmax){
        alert("Tensão do arranjo maior que a tensão de entrada do Inversor");
      }
      if(!sistema.condicaoImax){
        alert("Corrente do arranjo maior que a corrente de entrada do Inversor");
      }
    }

  }

  //------------------FIM DA Terceira TENTATIVA DE FORMAR O ARRANJO-------------------///

  // //-------------Determinação do arranjo---------------Estudar----------//
  // //Determina o número de painéis em série do Arranjo
  // //Nesta tentativa será baseada em atingir o nível mínimo de tensão do inversor
  // arranjo.numSerie = Math.round( (inversor.VmpptMin/painel.Vmin) - 0.5) + 1;
  // arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
  // //Afirma que é necessário uma string de painéis
  // if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
  //     arranjo.numParalelo = 1;
  // }

var numeroDeInversores = 0;
var numeroDePaineis = 0;
  //Para o caso de pequenas potências -->>> Potencia Necessária < 533 W && (consumo - custo de disponibilidade) < 53
  if( ((sistema.consumoMensal-sistema.disponibilidade) <= 57) || (sistema.numeroDePaineis<1) || potInteira<1000 ) {

      painel = painel255;
      inversor = inversor260;
      numeroDePaineis = Math.round(numPaineisDecimal);
      if(sistema.numeroDePaineis<1){
        numeroDePaineis = 1;
      }
      numeroDeInversores = Math.round(potInteira / inversor.potMaxEntrada) ;
      if(numeroDeInversores<1){
        numeroDeInversores = 1;
      }
      if (numeroDePaineis>3 || numeroDeInversores>3 ) {
        numeroDePaineis = 3;
        numeroDeInversores = 3;
      }
      arranjo.numSerie = 1;
      arranjo.numParalelo = 1;
      sistema.numPaineis = numeroDePaineis;
      sistema.numInversores = numeroDeInversores;
      arranjo.Vmax = painel.Vmax;
      arranjo.Vmin = painel.Vmin;
      console.log("NUMERO DE PAINEIS: "+numeroDePaineis+" Num INVERSORES: "+numeroDeInversores+"max POT ENTRADA"+inversor.potMaxEntrada+"pOT INTEIRA"+potInteira);
  }


  //-----------Adequação Final-------------------------------//
  //--------Determinação de Informações acerca do sistema FV: Arranjo, Custos, análise financeira ------//
  sistema.numPaineis = arranjo.numSerie * arranjo.numParalelo*sistema.numInversores;
  sistema.potencia   = sistema.numPaineis * painel.potencia;
  sistema.precoTotal = sistema.numPaineis*painel.preco + inversor.preco;
  investimento.custoPaineis = sistema.numPaineis*painel.preco;
  investimento.custoInversor = sistema.numInversores*inversor.preco;
  //investimento.custoCabeamento = sistema.potencia*investimento.precoCabeamento;
  //investimento.custoEstrutura = sistema.potencia*investimento.precoEstrutura;
  investimento.custoTotal = (investimento.custoPaineis + investimento.custoInversor +investimento.custoEstrutura + investimento.custoCabeamento);
  sistema.energiaMensal    = sistema.potencia*sistema.HSP*sistema.TD*(30/1000);
  sistema.energiaAnual    = sistema.potencia*sistema.HSP*sistema.TD*(365/1000);

  investimento.decaimentoPainel = 0.008;
  investimento.ajusteTarifa = 0.03;


  decaimentoModulos(investimento.decaimentoPainel,25);
  energiaGerada(sistema.energiaAnual,25);
  ajusteTarifa(investimento.ajusteTarifa,25);
  investimento.arrayCaixa[0] = investimento.arrayCaixa[0]-investimento.custoTotal;
  investimento.tir = tir(investimento.arrayCaixa);
  investimento.vpl = vplInvestimento(investimento.tma,investimento.arrayCaixa);
  investimento.payback = payback(investimento.arrayCaixa.length-1,investimento.arrayCaixa);
  investimento.paybackDescontado = payback(investimento.arrayCaixaPresente.length-1,investimento.arrayCaixaPresente);

  //Confere os resultados
  document.getElementById("resultado").innerHTML =
  "<br>--------------------SISTEMA----------------------------</br>"+
  //"<br>Potência: "+sistema.potencia+" W</br>"+
  "<br>Na faixa MPPT("+inversor.VmpptMin+"V - "+inversor.VmpptMax+" V): "+sistema.MPPTativo+"</br>"+
  "<br>Sistema ok: "+sistema.condicao+"</br>" ;

}

//----- fim da função run() -----//

function clean(){
  // function(){
  //   $("li").remove(".inv");
  // };
  menorPotencia = 0;
  sistema.condicaopotMaxEntrada = false;
  sistema.potNecessaria = 0;
  sistema.condicaoVmin = false;
  sistema.condicaoVmax = false;
  sistema.condicaoImax = false;
  sistema.condicao = false;
  sistema.MPPTativo = false;
  arranjo.numSerie=0;
  arranjo.numParalelo=1;
  arranjo.Vmax=0;
  arranjo.Vmin=0;
  arranjo.Imax=0;
  arranjo.Imin=0;
  sistema.potencia=0;
  sistema.numPaineis=0;
  sistema.TD=0.75;                         //Taxa de desempenho a priori é 0;75
  sistema.HSP=0;                        //Horas de Sol Pleno médias em Juiz de Fora. Medida em kWh/m² para um dia.
  sistema.consumoMensal=0;               //Consumo médio Mensal em kWh
  sistema.consumoDiario=0;                 //Consumo médio diário em Wh
  sistema.MPPTativo=false;                 //Verifica está na faixa MPPT
  sistema.condicaoVmin=false;              //Verifica Vmin do arranjo com o Inversor
  sistema.condicaoVmax=false;              //Verifica Vmax do arranjo com o Inversor
  sistema.condicaoImax=false;              //Verifica Imax do arranjo com o Inversor
  sistema.condicaopotMaxEntrada=false;     //Verifica potencia do arranjo com o Inversor
  sistema.condicao=false;                  //Verifica se todos os requisitos estão corretos
  sistema.tester=false;
  investimento.arrayDecaimento = [];
  investimento.arrayEnergia = [];
  investimento.arrayTarifa = [];
  investimento.arrayCaixa = [];
  investimento.tarifa = 0.8;            //Tarifa de energia - R$/kWh - 0.80
  investimento.ajusteTarifa = 0;      //Taxa de correção anual da tarida de energia 0.03 - 3%
  investimento.payback=0;           //Payback simples
  investimento.paybackDescontado=0; //Payback Descontado
  investimento.vpl=0;               //Valor presente líquido
  investimento.tir=0;               //Taxa Interna de Retorno
  investimento.custoPaineis=0;               //Custo total dos paineis
  investimento.custoInversor=0;             //Custo total dos Inversores
  investimento.precoCabeamento=0.75;          //preço da cabeamento em R$/kW;
  investimento.custoCabeamento=0;          //Custo total com cabeamento
  investimento.precoEstrutura=1.25;          //preço da estrutura em R$/kW;
  investimento.custoEstrutura=0;          //Custo total com estrutura
  investimento.custoTotal=0;          //Custo Total do sistema
}


//---------------------Análise de Investimentos------------------------------//
//Cria array que carrega a porcentagem de energia produzida pelo painel no ano ZERO
function decaimentoModulos(taxa, numPeriodos){
  for(i=0; i<=numPeriodos;i++){
      investimento.arrayDecaimento.push(Math.pow( (1.0 - taxa), i));
  }
}

//o vetor terá tamanho numPeriodos+1
function energiaGerada(energia, numPeriodos){
  for(i=0; i<=numPeriodos;i++){
      investimento.arrayEnergia.push(investimento.arrayDecaimento[i]*energia);
  }
}

//cria o array para a tarifa no decorrer do tempo
function ajusteTarifa(taxa, numPeriodos){
  for(i=0; i<=numPeriodos;i++){
      investimento.arrayTarifa.push(investimento.tarifa*Math.pow((1.0 + taxa), i));
      investimento.arrayCaixa.push(investimento.arrayTarifa[i]*investimento.arrayEnergia[i]);
  }
}


// investimento.decaimentoPainel = 0.007;
// investimento.ajusteTarifa = 0.03;
// investimento.tma = 0.065;
//
// decaimentoModulos(0.007,25);
// energiaGerada(1514,25);
// ajusteTarifa(0.026,25);
// investimento.arrayCaixa[0] = investimento.arrayCaixa[0]-14185;
// investimento.tir = tir(investimento.arrayCaixa);
// investimento.vpl = vpl(0.065,investimento.arrayCaixa);
console.log(investimento.arrayDecaimento);
console.log(investimento.arrayDecaimento.length);
console.log(investimento.arrayEnergia);
console.log(investimento.arrayEnergia.length);
console.log(investimento.arrayTarifa);
console.log(investimento.arrayTarifa.length);
console.log("Entrada:");
console.log(investimento.arrayCaixa);
console.log(investimento.arrayCaixa.length);
console.log("Valor Presente Líquido: "+ (investimento.vpl) );
console.log("TIR: "+investimento.tir);


/*
 * Calcula o Valor Presente Líquido para
 * uma variação de período constante
 *https://pt.stackoverflow.com/questions/96825/como-calcular-o-vpl-npv-e-o-tir-irr-usando-javascript
 * @taxa => taxa de desconto
 * @montantes => vetor com os valores com os recebimentos ou pagamentos
 *
 */
function vpl(taxa, montantes)
{
    var ret = montantes[0];
    ret = montantes[0];
    for (var i=1; i<montantes.length; i++){
        ret += montantes[i] / Math.pow( (1.0 + taxa), i);

      }
    return ret;
}

function vplInvestimento(taxa, montantes)
{
    var ret = montantes[0];
    investimento.arrayCaixaPresente[0] = montantes[0];
    for (var i=1; i<montantes.length; i++){
        ret += montantes[i] / Math.pow( (1.0 + taxa), i);
        investimento.arrayCaixaPresente[i] = montantes[i] / Math.pow( (1.0 + taxa), i);
      }
    return ret;
}



/*
 * Calcula a Taxa Interna de Retorno (Método da Bisseção)
 *https://pt.stackoverflow.com/questions/96825/como-calcular-o-vpl-npv-e-o-tir-irr-usando-javascript
 * @montantes => vetor com os valores
 */
 function tir(montantes)
 {
     var ret = -1000000000.0;
     var juros_inicial = -1.0;
     var juros_medio = 0.0;
     var juros_final = 1.0;
     var vpl_inicial = 0.0;
     var vpl_final = 0.0;
     var vf = 0.0;
     var erro = 1e-3;

 		for (var i=0; i<100; i++) {
     	vpl_inicial = vpl(juros_inicial, montantes);
       vpl_final = vpl(juros_final, montantes);
       if (sinal(vpl_inicial) != sinal(vpl_final))
       	break;
       juros_inicial -= 1.0;
       juros_final += 1.0;
     };
     var count = 0;
     for (;;) {
       // Busca por Bisseção
       var juros_medio = (juros_inicial + juros_final) / 2.0;
       var vpl_medio = vpl(juros_medio, montantes)

       if (Math.abs(vpl_medio) <= erro) {
           // Resultado foi encontrado
           return juros_medio*100.0;
       };
       if (sinal(vpl_inicial) == sinal(vpl_medio)) {
       		juros_inicial = juros_medio;
           vpl_inicial = vpl(juros_medio, montantes);
       } else {
       		juros_final = juros_medio;
           vpl_final = vpl(juros_medio, montantes);
       };
       if (++count > 1000000)
       	throw "looping inválido";
     };
     return ret;
 };


//define o sinal
function sinal(x) {
	return x < 0.0 ? -1 : 1;
}




// Payback Period (PP)
function payback(numOfPeriods, cfs) {
  // for even cash flows
  if (numOfPeriods === 0) {
    return Math.abs(csf[0]) / cfs[1];
  }
  // for uneven cash flows
  var cumulativeCashFlow = cfs[0];
  var yearsCounter = 1;
  for (i = 1; i < cfs.length; i++) {
    cumulativeCashFlow += cfs[i];
    if (cumulativeCashFlow >= 0) {
      yearsCounter += (cumulativeCashFlow - cfs[i]) / cfs[i];
      return yearsCounter;
    }
    else {
      yearsCounter++;
    }
  }
  if(cumulativeCashFlow<0){
    return "Não se paga, dado a vida útil do sistema!";
  }

};

var $doc = $('html, body');
$('.scrollSuave').click(function() {
    $doc.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

var igh = 0;
$("#go1").click(function(){
    $("#div3").fadeIn("slow");

    //Pensar em outra solução
    // if(igh>0){
    //   $("li").remove(".inv");
    // }
    // igh++;
});


$("#go").click(function(){
    $("#div1").fadeIn();
    $("#div2").fadeIn("slow");
});

$("#button-tutorial").click(function(){
  $("#sistema-intro").html("<br>Para projetar o sistema é necessário saber o consumo de energia e a quantidade de energia solar no local da instalação. Dessa maneira, utilizaremos os valores do consumo mensal médio e da irradiação.</br>");
  $("#sistema-intro2").html("<br>Potência necessária = [(Consumo média diária) / (Taxa de desempenho do sistema)] / (horas de sol pleno)</br> <br>Potência necessária = ("+(((sistema.consumoMensal-sistema.disponibilidade)/30)*1000).toFixed(2)+"/"+sistema.TD+") / ("+sistema.HSP+") = "+sistema.potNecessaria.toFixed(2)+"W </br>");


});

$("#button-sistema").click(function(){
  $("#sistema-intro").html("<br>Para projetar o sistema é necessário saber o consumo de energia e a quantidade de energia solar no local da instalação. Dessa maneira, utilizaremos os valores do consumo mensal médio e da irradiação.</br>");
  $("#sistema-intro2").html("<br>Potência necessária = [(Consumo média diária) / (Taxa de desempenho do sistema)] / (horas de sol pleno) = ("+(((sistema.consumoMensal-sistema.disponibilidade)/30)*1000).toFixed(2)+"/"+sistema.TD+") / ("+sistema.HSP+") = "+sistema.potNecessaria.toFixed(2)+"W </br>");
  $("#consumo-mensal").html("<br>Consumo Mensal: "+sistema.consumoMensal+" kWh </br>");
  $("#consumo-diario").html("<br>Consumo médio diário: "+sistema.consumoDiario.toFixed(2)+ "Wh </br>");
  $("#horas-de-sol").html("<br>Horas de Sol Pleno: "+sistema.HSP+" kWh/m².dia </br>");
  if(sistema.numInversores==1){
    $("#pot-necessaria").html("<br>Potência necessária para esse consumo: "+potInteira.toFixed(2)+"W</br>");
  }
  if(sistema.numInversores==2){
    $("#pot-necessaria").html("<br>Potência necessária para esse consumo: "+potInteira.toFixed(2)+"W</br>");
  }
  if(sistema.numInversores==3){
    potInteira = potInteira*3;
    if(inversor.nome=="Microinversor i-Energy GT260"){
      potInteira = potInteira/3;
    }
    $("#pot-necessaria").html("<br>Potência necessária para esse consumo: "+potInteira.toFixed(2)+"W</br>");
  }
  $("#pot-sistema").html("<br>Potência do sistema: "+sistema.potencia.toFixed(2)+"W</br>");
});

$("#button-arranjo").click(function(){
  $("#numero-paineis").html("<br>Número total de painéis: "+sistema.numPaineis+"</br>");
  if(sistema.numInversores==1){
    $("#numero-inversores1").html("<br>Será necessário "+sistema.numInversores+" inversor, no qual deverá ser conectado em sua entrada o seguinte arranjo de painéis:</br>");
    $("#numero-inversores3").html("");
  }
  if(sistema.numInversores>1){
    $("#numero-inversores3").html("<br>Serão necessários "+sistema.numInversores+" inversores. Para cada inversor deverá ser conectado na entrada o seguinte arranjo de painéis:</br>");
    $("#numero-inversores1").html("");
  }
  $("#paineis-serie").html("<br>Painéis em série: "+ arranjo.numSerie+"</br>");
  $("#paineis-paralelo").html("<br>Strings em paralelo: "+arranjo.numParalelo+"</br>");
  $("#pot-arranjo").html("<br>Potência do arranjo: "+sistema.potencia+" W</br>");
  $("#v-max").html("<br>Vmax do arranjo FV: "+arranjo.Vmax.toFixed(2)+"V</br>");
  $("#v-min").html("<br>Vmin do arranjo FV: "+arranjo.Vmin.toFixed(2)+"V</br>");
  $("#corrente-arranjo").html("<br>Corrente do arranjo FV: "+painel.correnteSC*arranjo.numParalelo+"A</br>");
  $("#painel-nome").html("<br>Painel: "+painel.nome+"  </br>");
  $("#painel-imagem").html(painel.imagem);
  $("#potencia-painel").html("<br>Potência do painel: "+painel.potencia+" W </br>");
  $("#vmax-painel").html("<br>Tensão máxima: "+painel.Vmax+ "V </br>");
  $("#vmin-painel").html("<br>Tensão mínima: "+painel.Vmin+ "V </br>");
  $("#corrente-painel").html("<br>Corrente de curto circuito: "+painel.correnteSC+ "A </br>");
  $("#inversor-nome").html("<br>"+inversor.nome+"</br>");
  $("#inversor-imagem").html(inversor.imagem);
  $("#inversor-max-pot-entrada").html("<br>Potência máxima de entrada: "+inversor.potMaxEntrada+" W</br>");
  $("#inversor-tensao-max-entrada").html("<br>Tensão máxima de entrada: "+inversor.VMaxEntrada+" V</br>");
  $("#inversor-mppt").html("<br>Faixa MPPT: "+inversor.VmpptMin+"V ~ "+ inversor.VmpptMax+" V </br>");
  $("#tensao-min-inicializacao").html("<br>Tensão mínima para inicialização: "+inversor.VMinStart+" V </br>");
  $("#inversor-corrente-entrada").html("<br>Corrente máxima de entrada: "+inversor.correnteMax+" A </br>");
});

$("#button-tutorial").click(function(){
  $("#tutorial-intro").html("<br>Para projetar o sistema é necessário saber o consumo de energia elétrica e a quantidade de energia solar no local da instalação. Dessa maneira, utilizaremos os valores do consumo mensal médio e da irradiação.</br>");
  $("#tutorial-hsp").html("<br>Energia solar = Horas de sol pleno = "+sistema.HSP+"kWh/m².dia</br>");
  $("#tutorial-consumo-mensal").html("<br>Consumo de energia médio mensal = "+sistema.consumoMensal+"kWh</br>");
  if(sistema.disponibilidade == 30){
    tutorial.difMensalDisponibilidade = sistema.consumoMensal - sistema.disponibilidade;
    $("#tutorial-custo-disponibilidade").html("<br>Deve-se pagar o custo de disponibilidade da rede elétrica, condição necessária para participar do sistema de compensação. Como o padrão dessa instalação é monofásico, o custo de disponibilidade é "+sistema.disponibilidade+"kWh.</br><br>Sendo assim, para não gerar energia em excesso, o ideal é retirar do consumo mensal esse valor, uma vez que o custo de disponibilidade é o valor mínimo de energia que é pago à concessionária. Portanto:</br><br>Diferença = Consumo Mensal - Custo de disponibilidade = "+sistema.consumoMensal+"kWh -"+sistema.disponibilidade+" kWh</br><br>Diferença da média mensal = "+tutorial.difMensalDisponibilidade+" kWh</br>");
  }
  if(sistema.disponibilidade == 50){
    tutorial.difMensalDisponibilidade = sistema.consumoMensal - sistema.disponibilidade;
    $("#tutorial-custo-disponibilidade").html("<br>Deve-se pagar o custo de disponibilidade da rede elétrica, condição necessária para participar do sistema de compensação. Como o padrão dessa instalação é bifásico, o custo de disponibilidade é "+sistema.disponibilidade+"kWh.</br><br>Sendo assim, para não gerar energia em excesso, o ideal é retirar do consumo mensal esse valor, uma vez que o custo de disponibilidade é o valor mínimo de energia que é pago à concessionária. Portanto:</br><br>Diferença = Consumo Mensal - Custo de disponibilidade = "+sistema.consumoMensal+"kWh -"+sistema.disponibilidade+" kWh</br><br>Diferença da média mensal = "+tutorial.difMensalDisponibilidade+" kWh</br>");
  }
  if(sistema.disponibilidade == 100){
    tutorial.difMensalDisponibilidade = sistema.consumoMensal - sistema.disponibilidade;
    $("#tutorial-custo-disponibilidade").html("<br>Deve-se pagar o custo de disponibilidade da rede elétrica, condição necessária para participar do sistema de compensação. Como o padrão dessa instalação é trifásico, o custo de disponibilidade é "+sistema.disponibilidade+"kWh.</br><br>Sendo assim, para não gerar energia em excesso, o ideal é retirar do consumo mensal esse valor, uma vez que o custo de disponibilidade é o valor mínimo de energia que é pago à concessionária. Portanto:</br><br>Diferença = Consumo Mensal - Custo de disponibilidade = "+sistema.consumoMensal+"kWh -"+sistema.disponibilidade+" kWh</br><br>Diferença da média mensal = "+tutorial.difMensalDisponibilidade+" kWh</br>");
  }
  $("#tutorial-intro-diaria").html("<br>Como as horas de sol pleno são dadas para um dia, devemos passar a diferença da média mensal para a média diária. Desse modo, obtemos: </br>");
  tutorial.difDiariaDisponibilidade = tutorial.difMensalDisponibilidade/30;
  tutorial.difDiariaDisponibilidade = tutorial.difDiariaDisponibilidade.toFixed(2);
  $("#tutorial-consumo-diario").html("<br>Consumo médio diário = Diferença da média mensal / (30 dias)</br><br>Consumo médio diário = "+tutorial.difMensalDisponibilidade+"kWh/(30)</br><br>Consumo médio diário = "+tutorial.difMensalDisponibilidade+"*(1000)Wh/(30)</br><br>Consumo médio diário = "+sistema.consumoDiario.toFixed(2)+"Wh</br>" );
  $("#tutorial-TD").html("<br>Além disso, devemos considerar a taxa de desempenho do sistema. Essa é equivalente ao rendimento de todo o sistema e leva em consideração as eventuais perdas dos equipamentos e os efeitos ambientais externos que influenciam na produção de energia. (Valor padrão entre 0.7 e 0.8)</br><br>Taxa de Desempenho = "+sistema.TD+"</br>");
  $("#tutorial-pot-necessaria").html("<br>Com esse valores podemos estimar a potência necessária para abater o consumo de energia elétrica. Basta utilizar a seguinte relação:</br><br>Potência necessária = [(Consumo médio diária) / (Taxa de desempenho do sistema)] / (horas de sol pleno)</br> <br>Potência necessária = ("+(((sistema.consumoMensal-sistema.disponibilidade)/30)*1000).toFixed(2)+"/"+sistema.TD+") / ("+sistema.HSP+") = "+sistema.potNecessaria.toFixed(2)+"W </br>");
  $("#tutorial-dimensionamento-intro").html("<br>A partir desse valor poderemos dimensionar os esquipamentos que compõe o sistema conectado à rede, sendo os principais os painéis e o inversor.</br>");
  if(sistema.potNecessaria>=10000){
    $("#tutorial-dimensionamento-10000").html("<br>Como a potência necessária é maior que 10000 kW, serão necessários mais que um inversor para a conexão com a rede elétrica. Uma vez que os painéis geram energia CC, enquanto a rede trabalha em regime CA. Sendo assim, trabalharemos com 3 inversores.</br><img src='imagens/forma.png' class='img-responsive center-block' alt='tabela'>");
    $("#tutorial-dimensionamento-10000-potencia").html("<br>Logo, a potência necessária será dividida por 3 e será distribuida para cada inversor. Desse jeito, a potência para cada inversor é:</br><br>Potência para cada inversor = Potência necessária / 3</br><br>Potência para cada inversor = "+(sistema.potNecessaria.toFixed(2))+"W/3</br><br>Potência para cada inversor = "+potInteira.toFixed(2)+"W</br>");
    $("#tutorial-dimensionamento-10000-inversor").html("<br>Com base nesse valor, deve-se procurar um inversor com a potência nominal próxima. Portanto, escolheu-se o "+inversor.nome+", que possui como potência máxima de entrada: "+inversor.potMaxEntrada+"W</br>");
    $("#tutorial-dimensionamento").html("");
    $("#tutorial-dimensionamento-potencia").html("");
    $("#tutorial-dimensionamento-inversor").html("");
    $("#tutorial-dimensionamento-gt260").html("");
    $("#tutorial-dimensionamento-gt260-potencia").html("");
  }
  if(sistema.potNecessaria<10000 && sistema.numInversores==1){
    $("#tutorial-dimensionamento-10000").html("");
    $("#tutorial-dimensionamento-10000-potencia").html("");
    $("#tutorial-dimensionamento-10000-inversor").html("");
    $("#tutorial-dimensionamento-gt260").html("");
    $("#tutorial-dimensionamento-gt260-potencia").html("");
    $("#tutorial-dimensionamento").html("<br>Como a potência necessária é menor que 10000 kW, será preciso somente um inversor para a conexão com a rede elétrica[norma ANEEL]. Lembrando que os painéis geram energia CC, enquanto a rede trabalha em regime CA.</br><img src='imagens/forma.png' class='img-responsive center-block' alt='tabela'>");
    $("#tutorial-dimensionamento-potencia").html("");
    $("#tutorial-dimensionamento-inversor").html("<br>Com base no valor da potência necessária, deve-se procurar um inversor com a potência nominal próxima. Portanto, escolheu-se o "+inversor.nome+", que possui como potência máxima de entrada: "+inversor.potMaxEntrada+"W</br>");
  }
  if(inversor.nome == "Microinversor i-Energy GT260"){
    if(sistema.numInversores>1){
      $("#tutorial-dimensionamento-10000").html("");
      $("#tutorial-dimensionamento-10000-potencia").html("");
      $("#tutorial-dimensionamento-10000-inversor").html("");
      $("#tutorial-dimensionamento").html("");
      $("#tutorial-dimensionamento-potencia").html("");
      $("#tutorial-dimensionamento-inversor").html("");
      $("#tutorial-dimensionamento-gt260").html("<br>Neste caso, serão necessários mais que um inversor para a conexão com a rede elétrica. Considerando que os painéis geram energia CC, enquanto a rede trabalha em regime CA. Esse caso, em especial requer um inversor de baixa potência, pois o consumo é muito baixo.</br><img src='imagens/forma.png' class='img-responsive center-block' alt='tabela'>");
      $("#tutorial-dimensionamento-gt260-potencia").html("<br>A potência necessária será dividida pela potência do inversor de 265W. Desse jeito, serão utilizados "+sistema.numInversores+" inversores, modelo "+inversor.nome+", o que dará uma potência de "+sistema.numInversores*inversor.potMaxEntrada+" W</br>");
    }
    if(sistema.numInversores==1){
      $("#tutorial-dimensionamento-10000").html("");
      $("#tutorial-dimensionamento-10000-potencia").html("");
      $("#tutorial-dimensionamento-10000-inversor").html("");
      $("#tutorial-dimensionamento").html("");
      $("#tutorial-dimensionamento-potencia").html("");
      $("#tutorial-dimensionamento-inversor").html("");
      $("#tutorial-dimensionamento-gt260-potencia").html("");
      $("#tutorial-dimensionamento-gt260").html("<br>Utilizaremos um inversor de baixa potência, pois o consumo é muito baixo. A potência necessária será próxima da potência do inversor que é de 260W. Desse jeito, será utilizado "+sistema.numInversores+" inversor, modelo: "+inversor.nome+"</br>");
    }
  }
  $("#tutorial-dimensionamento-numero-paineis-1").html("<br>O número de painéis desse sistema é determinado a partir da potência que o consumo demanda. Como a potência exigida pelo consumo é "+sistema.potNecessaria.toFixed(2)+"W, e a potência do painel é "+painel.potencia+" W pode-se fazer uma estimativa do número de painéis necessários.</br><br>Número de paineis = Potência necessária no consumo / Potência nominal do Painel</br><br>Número de paineis  = "+sistema.potNecessaria.toFixed(2)+"W / "+painel.potencia+"W </br><br>Número de paineis  = "+(sistema.potNecessaria/painel.potencia).toFixed(2)+"</br>");
  $("#tutorial-dimensionamento-numero-paineis-2").html("<br>Neste caso foi escolhido utilizar "+sistema.numPaineis+" painéis, gerando uma potência nominal de ("+sistema.numPaineis+"*"+painel.potencia+"W) = "+sistema.potencia+"W </br>");
  $("#tutorial-dimensionamento-arranjo").html("<br>Agora basta determinar a ligação(série ou paralelo) entre os painéis, a arquitetura será determinada a partir dos parâmetros de entrada do inversor.</br>");
  $("#tutorial-dimensionamento-arranjo-inversor").html("<br>Ao buscar no datasheet encontram-se os dados de entrada do inversor:</br><br>"+inversor.nome+"</br><br>"+inversor.imagem+"</br><br>Potência máxima de entrada: "+inversor.potMaxEntrada+" W</br><br>Tensão máxima de entrada: "+inversor.VMaxEntrada+" V</br><br>Faixa MPPT: "+inversor.VmpptMin+"V ~ "+ inversor.VmpptMax+" V </br><br>Tensão mínima para inicialização: "+inversor.VMinStart+" V </br><br>Corrente máxima de entrada: "+inversor.correnteMax+" A </br>");
  $("#tutorial-dimensionamento-arranjo-painel").html("<br>Deve-se também buscar os valores de tensão e corrente produzidos pelo painel escolhido. No datasheet encontram-se os dados: </br><br>Modelo: "+painel.nome+"</br><br>"+painel.imagem+"</br><br>Potência: "+painel.potencia+" W</br><br>Tensão máxima: "+painel.Vmax+" V</br><br>Tensão mínima: "+painel.Vmin+" V</br><br>Corrente de curto circuito: "+painel.correnteSC+" A</br>");
  if(sistema.numInversores<=1){
    $("#tutorial-dimensionamento-arranjo-2").html("<br>Visando estar dentro da faixa de operação MPPT do inversor e respeitando os limites de potência, tensão e corrente. Optou-se por conectar na entrada do inversor:</br><br>Painéis em série: "+arranjo.numSerie+"</br><br>Strings em paralelo: "+arranjo.numParalelo+"</br><img src='imagens/paineis.png' class='img-responsive center-block' alt='tabela'>");
  }
  if(sistema.numInversores>1){
    $("#tutorial-dimensionamento-arranjo-2").html("<br>Visando estar dentro da faixa de operação MPPT do inversor e respeitando os limites de potência, tensão e corrente. Optou-se por conectar na entrada de cada um dos "+sistema.numInversores+" inversores:</br><br>Painéis em série: "+arranjo.numSerie+"</br><br>Strings em paralelo: "+arranjo.numParalelo+"</br><img src='imagens/paineis.png' class='img-responsive center-block' alt='tabela'><br>Totalizando "+sistema.numPaineis+" painéis.</br><br>(Número painéis série * número de cadeias paralelo * número de inversores)</br><br>("+arranjo.numSerie+" * "+arranjo.numParalelo+" * "+sistema.numInversores+") = "+sistema.numPaineis+"</br>");
  }
  $("#tutorial-dimensionamento-arranjo-3").html("<br> Desse modo, no arranjo:</br><br>Tensão máxima  = Tensão máxima do painel * Número de paineis em série </br><br>Tensão máxima  = "+arranjo.Vmax.toFixed(2)+" V </br><br>Tensão mínima = Tensão mínima do painel * Número de paineis em série </br><br>Tensão mínima = "+arranjo.Vmin.toFixed(2)+" V</br><br>Corrente máxima = Corrente de curto circuito do painel * Número de Strings em paralelo</br><br>Corrente máxima = "+arranjo.Imax+" A</br><br>Potência de entrada = Potência do painel * número de painéis em série * número de Strings em paralelo </br><br>Potência de entrada = "+arranjo.numSerie*arranjo.numParalelo*painel.potencia+" W</br>");
  var energiaDiaria = sistema.potencia*sistema.HSP*sistema.TD;
  $("#tutorial-energia-diaria").html("<br>A energia diária média produzida por esse sistema é calculada utilizando:</br><br>Energia diária = Potência do sistema * Horas de Sol Pleno * Taxa de Desempenho do sistema</br><br>Energia diária = "+sistema.potencia+" * "+sistema.HSP+" * "+sistema.TD+"</br><br>Energia diária = "+energiaDiaria.toFixed(2)+" Wh</br>");
  $("#tutorial-energia-mensal").html("<br>Logo:</br><br>Energia mensal média = 30 * Energia diária </br><br>Energia mensal média = 30*"+energiaDiaria.toFixed(2)+" Wh</br><br>Energia mensal média = "+sistema.energiaMensal.toFixed(2)+" kWh</br>");
  $("#tutorial-energia-anual").html("<br>Energia anual média = 365 * Energia diária </br><br>Energia anual média = 365*"+energiaDiaria.toFixed(2)+" Wh</br><br>Energia anual média = "+sistema.energiaAnual.toFixed(2)+" kWh</br>");
  $("#tutorial-financeiro").html("<br>A receita economizada com o sistema fotovolaico em um ano é dada pela tarifa de energia e pela produção média anual de energia. Desse modo: </br><br>Receita = Energia anual média * Tarifa de energia</br><br>Receita = "+sistema.energiaAnual.toFixed(2)+" * R$"+investimento.tarifa+" = R$"+investimento.tarifa*sistema.energiaAnual+"</br>");
  //tutorial.tma = investimento.tma*100;
  tutorial.decaimentoPainel = investimento.decaimentoPainel*100
  $("#tutorial-financeiro-2").html("<br>Para a realização da análise de investimentos foi considerado: </br><br>Período de vida útil do sistema de 25 anos.</br><br>Taxa mínima de atratividade escolhida foi de "+tutorial.tma+"% ao ano.[O valor de 6.50% equivale a um rendimento de poupança] </br><br>Decaimento de produção de energia dos painéis de "+tutorial.decaimentoPainel.toFixed(2)+"% ao ano.</br><br>Taxa de correção da tarifa de energia elétrica de "+investimento.ajusteTarifa*100+"% ao ano.</br><br>O custo da estrutura de suporte dos painéis foi estimado em R$"+investimento.precoEstrutura.toFixed(2)+" por Watt de potência instalada.</br><br>O custo de cabeamento e proteção do sistema foi estimado em R$"+investimento.precoCabeamento.toFixed(2)+" por Watt de potência instalada.</br><br>Em caso de problemas ou desejo de adicionar algum equipamento no banco de dados envie email para: <strong>solano.aguirre@engenharia.ufjf.br</strong></br>");
});

$("#button-analise").click(function(){
  $("#custo-total-paineis").html("<br>Custo total dos painéis</a>: R$"+investimento.custoPaineis+"</br>");
  $("#custo-total-inversor").html("<br>Custo total dos Inversores: R$"+investimento.custoInversor+ "</br>");
  $("#custo-total-estrutura").html("<br>Custo estimado com a Estrutura: R$"+investimento.custoEstrutura+ "</br>");
  $("#custo-total-cabeamento").html("<br>Custo estimado com Cabeamento e Proteção: R$"+investimento.custoCabeamento+ "</br>");
  $("#custo-total-sistema").html("<br>Custo total do sistema: R$"+investimento.custoTotal+"</br>");
  $("#taxa-minima-atratividade").html("<br><a href='http://www.wrprates.com/o-que-e-tma-taxa-minima-de-atratividade/' target='_blank'>Taxa mínima de atratividade</a>: "+tutorial.tma+"% ao ano</br>");
  $("#valor-presente-liquido").html("<br><a href='http://www.wrprates.com/o-que-e-vpl-valor-presente-liquido/' target='_blank'>Valor Presente Líquido</a>: R$"+investimento.vpl.toFixed(2)+"</br>");
  $("#taxa-interna-retorno").html("<br><a href='http://www.wrprates.com/o-que-e-tir-taxa-interna-de-retorno/' target='_blank'>Taxa Interna de Retorno</a>: "+investimento.tir.toFixed(2)+"% ao ano</br>");
  $("#payback").html("<br><a href='http://www.wrprates.com/qual-e-a-diferenca-entre-payback-simples-e-descontado/' target='_blank'>Payback</a>: "+investimento.payback.toFixed(2)+" anos</br>");
  var tipovarpaybackdescontado = typeof investimento.paybackDescontado;
  if(tipovarpaybackdescontado == "number"){
      $("#payback-descontado").html("<br><a href='http://www.wrprates.com/qual-e-a-diferenca-entre-payback-simples-e-descontado/' target='_blank'>Payback Descontado</a>: "+investimento.paybackDescontado.toFixed(2)+" anos</br>");
  }
  if(tipovarpaybackdescontado == "string"){
      $("#payback-descontado").html("<br><a href='http://www.wrprates.com/qual-e-a-diferenca-entre-payback-simples-e-descontado/' target='_blank'>Payback Descontado</a>: "+investimento.paybackDescontado+" </br>");
  }


});

// $("#pot-sistema").html("<br>Na faixa MPPT("+inversor.VmpptMin+"V - "+inversor.VmpptMax+" V):"+ +"</br>");

//código para a rolagem rápida no tutorial
var $doc = $('html, body');

// $('.scrollSuave').click(function() {
//     $("#myModalEquipamentos").animate({
//       //scrollTop: $( $.attr(this, 'href') ).offset().top
//       scrollTop: 400
//     }, 500);
//     //return false;
// });


//$("#myModalEquipamentos").animate({"scrollTop": 00}, 400)
// function teste222() {
//     $doc.animate({
//         scrollTop: $("#determinacao-demanda").offset().top
//     }, 500);
//     return false;
// };
//$("#myModalEquipamentos").animate({"scrollTop": 00}, 400)

//-------------Otimização-----------------------------------

//passar como entrada número máximo de panéis,esta está sendo utilizada, ou talvez potencia máxima a ser pesquisada
function potenciaCustos(){
  var custoTotal = 0;
  var potenciaArranjo = 0;
  var valorpresente = 0;
  var potenciaAtual = 0;
  var numeroMaximo = 0;

  numeroMaximo = (3*inversor.potMaxEntrada) / painel.potencia;
  numeroMaximo = Math.round(numeroMaximo-0.5);


  for(i=1; i<=numeroMaximo;i++){
    console.log("Numero Maximo de paineis: "+numeroMaximo);
    otimizacao.numeroPaineis.push(i);
    potenciaAtual= painel.potencia*i;
    otimizacao.potenciaArranjo.push(potenciaAtual);
    if(potenciaAtual > inversor.potMaxEntrada*sistema.numInversores){
      sistema.numInversores++;
    }
    otimizacao.arrayCustoTotal.push( custoDoSistema(i,painel.preco,sistema.numInversores,inversor.preco,investimento.custoEstrutura,investimento.custoCabeamento) );


    //testeVpl(potenciaAtual,custoTotal);
    //console.log("Custo Total: "+custoTotal+"Potencia atual: "+potenciaAtual);
    //Até aqui está correto! Verificar a função energiaProduzidaAnual!
    //investimento.tma, investimento.tarifa, sistema.HSP,sistema.TD são dados inseridos pelo usuário; investimento.ajusteTarifa e investimento.decaimentoPainel, numPeriodos = 25 estão fixados pelo programador
    //energiaProduzidaAnual(potenciaAtual,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa, investimento.tma,custoTotal);

  }

  console.log("fim da função");
}


//determinar o custo total do sistema - Testada!
function custoDoSistema(numeroPaineis,custoPainel,NumeroInversores,custoInversor,custoEstrutura,custoCabeamento){
  return ( (numeroPaineis*custoPainel) + (NumeroInversores*custoInversor) + custoEstrutura + custoCabeamento );

}


//Função Testada!
function energiaProduzidaAnual(potencia,hsp,taxaDesempenho,periodos,taxaDecaimentoPainel,tarifaEnergia,taxaReajusteTarifa,tma,custoTotal){
      var energia = potencia*hsp*taxaDesempenho*(365/1000);
      var arrayDecaimento = [];
      var arrayEnergia = [];
      var arrayTarifa = [];
      var arrayCaixa = [];
      //os vetor arrayEnergia e arrayDecaimento terão tamanhos numPeriodos+1
      for(i=0; i<=periodos;i++){
          arrayDecaimento.push(Math.pow( (1.0 - taxaDecaimentoPainel), i));
          arrayEnergia.push(arrayDecaimento[i]*energia);
          arrayTarifa.push(tarifaEnergia*Math.pow((1.0 + taxaReajusteTarifa), i));
          arrayCaixa.push(arrayTarifa[i]*arrayEnergia[i]);
      }
      arrayCaixa[0] = arrayCaixa[0]-custoTotal;
      //return vpl(tma,arrayCaixa);
      otimizacao.todosVpl.push( vpl(tma,arrayCaixa)  );
}


function testeVpl(){

    if( (otimizacao.numeroPaineis[otimizacao.numeroPaineis.length-1])<100 ){
energiaProduzidaAnual(otimizacao.potenciaArranjo[0] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[0]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[1] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[1]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[2] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[2]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[3] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[3]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[4] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[4]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[5] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[5]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[6] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[6]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[7] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[7]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[8] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[8]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[9] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[9]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[10] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[10]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[11] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[11]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[12] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[12]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[13] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[13]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[14] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[14]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[15] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[15]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[16] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[16]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[17] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[17]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[18] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[18]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[19] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[19]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[20] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[20]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[21] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[21]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[22] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[22]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[23] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[23]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[24] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[24]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[25] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[25]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[26] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[26]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[27] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[27]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[28] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[28]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[29] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[29]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[30] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[30]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[31] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[31]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[32] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[32]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[33] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[33]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[34] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[34]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[35] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[35]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[36] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[36]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[37] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[37]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[38] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[38]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[39] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[39]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[40] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[40]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[41] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[41]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[42] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[42]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[43] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[43]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[44] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[44]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[45] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[45]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[46] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[46]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[47] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[47]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[48] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[48]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[49] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[49]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[50] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[50]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[51] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[51]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[52] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[52]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[53] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[53]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[54] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[54]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[55] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[55]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[56] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[56]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[57] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[57]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[58] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[58]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[59] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[59]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[60] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[60]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[61] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[61]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[62] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[62]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[63] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[63]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[64] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[64]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[65] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[65]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[66] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[66]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[67] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[67]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[68] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[68]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[69] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[69]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[70] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[70]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[71] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[71]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[72] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[72]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[73] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[73]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[74] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[74]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[75] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[75]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[76] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[76]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[77] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[77]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[78] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[78]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[79] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[79]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[80] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[80]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[81] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[81]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[82] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[82]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[83] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[83]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[84] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[84]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[85] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[85]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[86] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[86]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[87] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[87]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[88] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[88]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[89] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[89]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[90] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[90]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[91] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[91]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[92] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[92]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[93] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[93]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[94] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[94]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[95] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[95]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[96] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[96]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[97] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[97]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[98] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[98]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[99] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[99]);
  energiaProduzidaAnual(otimizacao.potenciaArranjo[100] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[100]);
  }
else{
 energiaProduzidaAnual(otimizacao.potenciaArranjo[0] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[0]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[1] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[1]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[2] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[2]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[3] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[3]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[4] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[4]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[5] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[5]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[6] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[6]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[7] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[7]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[8] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[8]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[9] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[9]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[10] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[10]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[11] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[11]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[12] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[12]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[13] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[13]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[14] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[14]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[15] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[15]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[16] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[16]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[17] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[17]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[18] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[18]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[19] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[19]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[20] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[20]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[21] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[21]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[22] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[22]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[23] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[23]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[24] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[24]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[25] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[25]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[26] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[26]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[27] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[27]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[28] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[28]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[29] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[29]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[30] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[30]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[31] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[31]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[32] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[32]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[33] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[33]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[34] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[34]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[35] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[35]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[36] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[36]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[37] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[37]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[38] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[38]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[39] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[39]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[40] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[40]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[41] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[41]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[42] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[42]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[43] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[43]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[44] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[44]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[45] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[45]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[46] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[46]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[47] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[47]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[48] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[48]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[49] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[49]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[50] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[50]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[51] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[51]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[52] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[52]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[53] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[53]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[54] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[54]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[55] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[55]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[56] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[56]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[57] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[57]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[58] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[58]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[59] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[59]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[60] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[60]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[61] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[61]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[62] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[62]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[63] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[63]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[64] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[64]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[65] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[65]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[66] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[66]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[67] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[67]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[68] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[68]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[69] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[69]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[70] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[70]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[71] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[71]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[72] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[72]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[73] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[73]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[74] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[74]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[75] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[75]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[76] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[76]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[77] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[77]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[78] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[78]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[79] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[79]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[80] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[80]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[81] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[81]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[82] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[82]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[83] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[83]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[84] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[84]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[85] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[85]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[86] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[86]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[87] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[87]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[88] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[88]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[89] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[89]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[90] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[90]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[91] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[91]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[92] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[92]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[93] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[93]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[94] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[94]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[95] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[95]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[96] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[96]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[97] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[97]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[98] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[98]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[99] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[99]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[100] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[100]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[101] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[101]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[102] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[102]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[103] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[103]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[104] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[104]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[105] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[105]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[106] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[106]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[107] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[107]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[108] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[108]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[109] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[109]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[110] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[110]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[111] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[111]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[112] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[112]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[113] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[113]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[114] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[114]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[115] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[115]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[116] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[116]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[117] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[117]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[118] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[118]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[119] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[119]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[120] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[120]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[121] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[121]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[122] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[122]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[123] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[123]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[124] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[124]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[125] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[125]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[126] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[126]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[127] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[127]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[128] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[128]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[129] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[129]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[130] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[130]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[131] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[131]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[132] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[132]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[133] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[133]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[134] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[134]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[135] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[135]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[136] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[136]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[137] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[137]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[138] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[138]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[139] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[139]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[140] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[140]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[141] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[141]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[142] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[142]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[143] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[143]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[144] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[144]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[145] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[145]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[146] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[146]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[147] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[147]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[148] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[148]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[149] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[149]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[150] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[150]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[151] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[151]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[152] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[152]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[153] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[153]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[154] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[154]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[155] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[155]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[156] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[156]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[157] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[157]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[158] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[158]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[159] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[159]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[160] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[160]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[161] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[161]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[162] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[162]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[163] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[163]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[164] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[164]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[165] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[165]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[166] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[166]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[167] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[167]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[168] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[168]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[169] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[169]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[170] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[170]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[171] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[171]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[172] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[172]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[173] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[173]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[174] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[174]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[175] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[175]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[176] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[176]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[177] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[177]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[178] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[178]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[179] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[179]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[180] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[180]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[181] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[181]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[182] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[182]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[183] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[183]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[184] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[184]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[185] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[185]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[186] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[186]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[187] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[187]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[188] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[188]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[189] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[189]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[190] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[190]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[191] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[191]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[192] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[192]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[193] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[193]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[194] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[194]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[195] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[195]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[196] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[196]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[197] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[197]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[198] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[198]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[199] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[199]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[200] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[200]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[201] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[201]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[202] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[202]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[203] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[203]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[204] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[204]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[205] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[205]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[206] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[206]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[207] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[207]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[208] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[208]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[209] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[209]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[210] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[210]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[211] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[211]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[212] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[212]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[213] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[213]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[214] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[214]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[215] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[215]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[216] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[216]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[217] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[217]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[218] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[218]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[219] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[219]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[220] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[220]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[221] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[221]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[222] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[222]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[223] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[223]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[224] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[224]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[225] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[225]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[226] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[226]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[227] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[227]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[228] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[228]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[229] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[229]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[230] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[230]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[231] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[231]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[232] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[232]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[233] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[233]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[234] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[234]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[235] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[235]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[236] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[236]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[237] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[237]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[238] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[238]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[239] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[239]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[240] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[240]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[241] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[241]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[242] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[242]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[243] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[243]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[244] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[244]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[245] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[245]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[246] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[246]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[247] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[247]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[248] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[248]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[249] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[249]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[250] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[250]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[251] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[251]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[252] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[252]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[253] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[253]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[254] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[254]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[255] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[255]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[256] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[256]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[257] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[257]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[258] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[258]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[259] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[259]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[260] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[260]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[261] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[261]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[262] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[262]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[263] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[263]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[264] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[264]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[265] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[265]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[266] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[266]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[267] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[267]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[268] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[268]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[269] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[269]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[270] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[270]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[271] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[271]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[272] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[272]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[273] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[273]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[274] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[274]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[275] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[275]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[276] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[276]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[277] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[277]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[278] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[278]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[279] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[279]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[280] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[280]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[281] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[281]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[282] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[282]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[283] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[283]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[284] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[284]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[285] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[285]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[286] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[286]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[287] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[287]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[288] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[288]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[289] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[289]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[290] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[290]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[291] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[291]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[292] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[292]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[293] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[293]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[294] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[294]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[295] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[295]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[296] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[296]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[297] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[297]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[298] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[298]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[299] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[299]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[300] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[300]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[301] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[301]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[302] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[302]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[303] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[303]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[304] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[304]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[305] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[305]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[306] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[306]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[307] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[307]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[308] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[308]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[309] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[309]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[310] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[310]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[311] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[311]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[312] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[312]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[313] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[313]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[314] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[314]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[315] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[315]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[316] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[316]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[317] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[317]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[318] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[318]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[319] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[319]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[320] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[320]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[321] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[321]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[322] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[322]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[323] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[323]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[324] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[324]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[325] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[325]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[326] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[326]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[327] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[327]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[328] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[328]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[329] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[329]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[330] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[330]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[331] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[331]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[332] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[332]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[333] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[333]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[334] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[334]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[335] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[335]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[336] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[336]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[337] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[337]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[338] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[338]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[339] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[339]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[340] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[340]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[341] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[341]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[342] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[342]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[343] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[343]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[344] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[344]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[345] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[345]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[346] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[346]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[347] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[347]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[348] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[348]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[349] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[349]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[350] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[350]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[351] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[351]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[352] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[352]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[353] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[353]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[354] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[354]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[355] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[355]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[356] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[356]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[357] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[357]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[358] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[358]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[359] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[359]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[360] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[360]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[361] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[361]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[362] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[362]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[363] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[363]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[364] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[364]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[365] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[365]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[366] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[366]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[367] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[367]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[368] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[368]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[369] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[369]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[370] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[370]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[371] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[371]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[372] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[372]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[373] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[373]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[374] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[374]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[375] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[375]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[376] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[376]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[377] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[377]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[378] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[378]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[379] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[379]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[380] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[380]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[381] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[381]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[382] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[382]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[383] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[383]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[384] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[384]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[385] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[385]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[386] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[386]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[387] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[387]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[388] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[388]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[389] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[389]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[390] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[390]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[391] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[391]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[392] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[392]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[393] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[393]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[394] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[394]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[395] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[395]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[396] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[396]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[397] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[397]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[398] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[398]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[399] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[399]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[400] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[400]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[401] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[401]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[402] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[402]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[403] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[403]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[404] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[404]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[405] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[405]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[406] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[406]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[407] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[407]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[408] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[408]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[409] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[409]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[410] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[410]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[411] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[411]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[412] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[412]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[413] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[413]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[414] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[414]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[415] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[415]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[416] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[416]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[417] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[417]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[418] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[418]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[419] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[419]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[420] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[420]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[421] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[421]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[422] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[422]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[423] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[423]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[424] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[424]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[425] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[425]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[426] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[426]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[427] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[427]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[428] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[428]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[429] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[429]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[430] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[430]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[431] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[431]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[432] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[432]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[433] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[433]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[434] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[434]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[435] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[435]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[436] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[436]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[437] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[437]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[438] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[438]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[439] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[439]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[440] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[440]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[441] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[441]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[442] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[442]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[443] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[443]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[444] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[444]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[445] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[445]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[446] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[446]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[447] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[447]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[448] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[448]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[449] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[449]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[450] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[450]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[451] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[451]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[452] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[452]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[453] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[453]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[454] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[454]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[455] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[455]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[456] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[456]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[457] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[457]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[458] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[458]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[459] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[459]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[460] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[460]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[461] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[461]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[462] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[462]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[463] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[463]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[464] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[464]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[465] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[465]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[466] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[466]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[467] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[467]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[468] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[468]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[469] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[469]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[470] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[470]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[471] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[471]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[472] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[472]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[473] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[473]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[474] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[474]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[475] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[475]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[476] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[476]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[477] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[477]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[478] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[478]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[479] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[479]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[480] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[480]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[481] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[481]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[482] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[482]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[483] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[483]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[484] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[484]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[485] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[485]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[486] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[486]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[487] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[487]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[488] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[488]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[489] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[489]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[490] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[490]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[491] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[491]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[492] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[492]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[493] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[493]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[494] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[494]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[495] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[495]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[496] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[496]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[497] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[497]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[498] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[498]);
 energiaProduzidaAnual(otimizacao.potenciaArranjo[499] ,sistema.HSP,sistema.TD,25, investimento.decaimentoPainel,investimento.tarifa,investimento.ajusteTarifa,investimento.tma,otimizacao.arrayCustoTotal[499]);
}
}



//cria o array para a tarifa no decorrer do tempo
function ajusteTarifa(taxa, numPeriodos){
  for(i=0; i<=numPeriodos;i++){
      investimento.arrayTarifa.push(investimento.tarifa*Math.pow((1.0 + taxa), i));
      investimento.arrayCaixa.push(investimento.arrayTarifa[i]*investimento.arrayEnergia[i]);
  }
}







  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          //labels: ["January", "February", "March", "April", "May", "June", "July"],
          labels : otimizacao.numeroPaineis,
          datasets: [{
              label: "Valor presente líquido - Otimização",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              //data: [0, 10, 5, 2, 20, 30, 45],
              data : otimizacao.vpl,
          }]
      },

      // Configuration options go here
      options: {}
  });



function repasseDadosVpl(){

    for(i=0;i<otimizacao.numeroPaineis.length;i++){
      otimizacao.vpl[i] = otimizacao.todosVpl[i];
    }

}


function graphVpl(){

    potenciaCustos();
    testeVpl();
    repasseDadosVpl();
}
