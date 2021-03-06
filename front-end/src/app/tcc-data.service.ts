import { Injectable } from '@angular/core';

import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export class TCC {
  id: number;
  title: string;
  author_id: number;
  professor_id: number;
  approved: boolean;
  keywords: string[];
  abstract: string;
  date: Date;
  fileID: number;

  constructor(){
    this.title = "";
    this.approved = false;
    this.keywords = [''];
    this.abstract = "";
    this.date = new Date();
  }
}

@Injectable({
  providedIn: 'root'
})
export class TccDataService {
  private tccs: TCC[] = new Array();
  constructor() {
    let tcc_ids = [0, 1, 2, 3];
    let tcc_titles = ["Nova Arquitetura de ambientes de bases de dados do Tribunal"
        +" de Contas do Estado do Rio Grande do Norte", 
      "Projeto e implementação de um acelerador de arquitetura reconfigurável",
      "Procedural terrain generation through image completion using GANs", 
      "Usando técnicas de mineração de repositórios software para apoiar a automação "
        +"de testes de software"
    ];
    let tcc_authors = [0, 1, 4, 6];
    let tcc_professors = [2, 3, 3, 2];
    let tcc_keywords = [["Arquitetura de Banco de dados", "Arquitetura de Microsserviço", 
      "Arquitetura Monolítica"], 
      ["Acelerador", "Arquitetura Reconfigurável", "Arquitetura de Computadores"], 
      ["Geração Procedural de Terrenos", "Procedural Terrain Generation", 
      "Compleção de Imagens", "Image Completion", "Redes Adversárias Generativas", 
      "Generative Adversarial Networks"],
      ["testes de software", "software testing", "automação de testes", "test automation",
      "mineração de repositórios de software", "software repository mining"]
    ];
    let tcc_abstracts = [lorem.generateParagraphs(1), lorem.generateParagraphs(1),
      lorem.generateParagraphs(1), lorem.generateParagraphs(1)];
    let tcc_dates = [new Date(2019, 8, 23), new Date(2019, 6, 10), new Date(2019, 7, 23),
      new Date(2019, 6, 13)];

    for (let i in tcc_ids) {
      let new_tcc = new TCC();
      new_tcc.id = tcc_ids[i];
      new_tcc.title = tcc_titles[i];
      new_tcc.author_id = tcc_authors[i];
      new_tcc.professor_id = tcc_professors[i];
      new_tcc.keywords = tcc_keywords[i];
      new_tcc.abstract = tcc_abstracts[i];
      new_tcc.date = tcc_dates[i];
      new_tcc.approved = false;
      this.tccs.push(new_tcc)
    }
  }

  obtainTCCs(){
    return this.tccs;
  }

  /*#TODO: implement actual search algorithm in backend*/
  searchTCCs(query: string): TCC[]{
    return this.tccs;
  }

  obtainTCC(id: Number): TCC{
    for (let tcc of this.tccs){
      if (id == tcc.id){
        return tcc;
      }
    }

    return new TCC();
  }

  /*If a tcc exists, update it with new data. 
  If it does not, create a new one.*/

  getUnusedID(): number{
    let current_ids = new Set();
    for (let i in this.tccs){
      current_ids.add(this.tccs[i].id)
    }
    let i: number = 0;
    while (current_ids.has(i)){
      i = i + 1
    }
    return i;
  }

  /**
   * If the TCC ID is -1, append a new TCC.
   * If it is >= 0, update an existing TCC.
   * @param tcc TCC object to update or add
   */
  updateTCC(tcc: TCC) {
    if (tcc.id >= 0){
      let tcc_index: number = -1;
      for (let i in this.tccs){
        if (this.tccs[i].id == tcc.id){
          tcc_index = Number(i);
        }
      }
      this.tccs[tcc_index] = tcc;
    }else{
      /*new TCCs come with a -1 ID, give it a valid ID*/
      tcc.id = this.getUnusedID();
      this.tccs.push(tcc)
    }

    return tcc.id;
  }

  deleteTCCbyAuthor(user_id: Number) {
    let index_to_erase: number = -1;
    for (let i in this.tccs){
      if (this.tccs[i].author_id == user_id){
        index_to_erase = Number(i);
      }
    }
    if (index_to_erase >= 0){
      this.tccs.splice(index_to_erase, 1);
    }
  }
}
