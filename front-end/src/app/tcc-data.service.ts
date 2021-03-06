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
  keywords: string[];
  abstract: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TccDataService {
  private tccs: TCC[] = new Array();
  constructor() {
    let tcc_ids = [0, 1, 2];
    let tcc_titles = ["Nova Arquitetura de ambientes de bases de dados do Tribunal"
      +" de Contas do Estado do Rio Grande do Norte", 
      "Projeto e implementação de um acelerador de arquitetura reconfigurável",
      "Procedural terrain generation through image completion using GANs"
    ];
    let tcc_authors = [0, 1, 4];
    let tcc_professors = [2, 3, 3];
    let tcc_keywords = [["Arquitetura de Banco de dados", "Arquitetura de Microsserviço", 
      "Arquitetura Monolítica"], 
      ["Acelerador", "Arquitetura Reconfigurável", "Arquitetura de Computadores"], 
      ["Geração Procedural de Terrenos", "Procedural Terrain Generation", 
      "Compleção de Imagens", "Image Completion", "Redes Adversárias Generativas", 
      "Generative Adversarial Networks"]
    ];
    let tcc_abstracts = [lorem.generateParagraphs(1), lorem.generateParagraphs(1),
      lorem.generateParagraphs(1)];
    let tcc_dates = [new Date(2019, 8, 23), new Date(2019, 6, 10), new Date(2019, 7, 23)];

    for (let i in tcc_ids) {
      let new_tcc = new TCC();
      new_tcc.id = tcc_ids[i];
      new_tcc.title = tcc_titles[i];
      new_tcc.author_id = tcc_authors[i];
      new_tcc.professor_id = tcc_professors[i];
      new_tcc.keywords = tcc_keywords[i];
      new_tcc.abstract = tcc_abstracts[i];
      new_tcc.date = tcc_dates[i];
      this.tccs.push(new_tcc)
    }
  }

  obtainTCCs(){
    return this.tccs;
  }
}
