/**
 * 세계 5대 리그 클럽 로고 데이터
 * 프리미어리그, 라리가, 분데스리가, 세리에A, 리그1의 클럽 로고 링크
 */
const clubsData = {
  // 프리미어리그 (영국)
  premier: [
    { name: "맨체스터 시티", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/47/Manchester_City_FC_badge.svg/180px-Manchester_City_FC_badge.svg.png" },
    { name: "맨체스터 유나이티드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/7/7a/Manchester_United_FC_crest.svg/180px-Manchester_United_FC_crest.svg.png" },
    { name: "리버풀", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/0/0c/Liverpool_FC.svg/180px-Liverpool_FC.svg.png" },
    { name: "첼시", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/cc/Chelsea_FC.svg/180px-Chelsea_FC.svg.png" },
    { name: "아스널", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/5/53/Arsenal_FC.svg/180px-Arsenal_FC.svg.png" },
    { name: "토트넘 홋스퍼", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/b/b4/Tottenham_Hotspur.svg/180px-Tottenham_Hotspur.svg.png" },
    { name: "애스턴 빌라", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f9/Aston_Villa_FC_crest_%282016%29.svg/180px-Aston_Villa_FC_crest_%282016%29.svg.png" },
    { name: "뉴캐슬 유나이티드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/5/56/Newcastle_United_Logo.svg/180px-Newcastle_United_Logo.svg.png" },
    { name: "웨스트햄 유나이티드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c2/West_Ham_United_FC_logo.svg/180px-West_Ham_United_FC_logo.svg.png" },
    { name: "브라이튼", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/180px-Brighton_%26_Hove_Albion_logo.svg.png" },
    { name: "울버햄튼", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/fc/Wolverhampton_Wanderers.svg/180px-Wolverhampton_Wanderers.svg.png" },
    { name: "에버턴", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/7/7c/Everton_FC_logo.svg/180px-Everton_FC_logo.svg.png" },
    { name: "레스터 시티", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/2/2d/Leicester_City_crest.svg/180px-Leicester_City_crest.svg.png" },
    { name: "크리스탈 팰리스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/0/0c/Crystal_Palace_FC_logo.svg/180px-Crystal_Palace_FC_logo.svg.png" },
    { name: "브렌트포드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/2/2a/Brentford_FC_crest.svg/180px-Brentford_FC_crest.svg.png" },
    { name: "풀럼", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/eb/Fulham_FC_%28shield%29.svg/180px-Fulham_FC_%28shield%29.svg.png" },
    { name: "본머스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e5/AFC_Bournemouth_%282013%29.svg/180px-AFC_Bournemouth_%282013%29.svg.png" },
    { name: "노팅엄 포레스트", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e5/Nottingham_Forest_F.C._logo.svg/180px-Nottingham_Forest_F.C._logo.svg.png" },
    { name: "번리", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/6/62/Burnley_F.C._Logo.svg/180px-Burnley_F.C._Logo.svg.png" },
    { name: "셰필드 유나이티드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/9/9c/Sheffield_United_FC_logo.svg/180px-Sheffield_United_FC_logo.svg.png" }
  ],
  
  // 라리가 (스페인)
  laliga: [
    { name: "레알 마드리드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c7/Real_Madrid_CF.svg/180px-Real_Madrid_CF.svg.png" },
    { name: "바르셀로나", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/47/FC_Barcelona.svg/180px-FC_Barcelona.svg.png" },
    { name: "아틀레티코 마드리드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f4/Atletico_Madrid_2017_logo.svg/180px-Atletico_Madrid_2017_logo.svg.png" },
    { name: "세비야", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/3/3f/Sevilla_FC_logo.svg/180px-Sevilla_FC_logo.svg.png" },
    { name: "비야레알", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/7/70/Villarreal_CF_logo.svg/180px-Villarreal_CF_logo.svg.png" },
    { name: "레알 소시에다드", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f1/Real_Sociedad_logo.svg/180px-Real_Sociedad_logo.svg.png" },
    { name: "레알 베티스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/1/13/Real_betis_logo.svg/180px-Real_betis_logo.svg.png" },
    { name: "발렌시아", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/ce/Valenciacf.svg/180px-Valenciacf.svg.png" },
    { name: "아틀레틱 빌바오", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/9/98/Athletic_Club_Bilbao_logo.svg/180px-Athletic_Club_Bilbao_logo.svg.png" },
    { name: "오사수나", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c3/Escudo_CA_Osasuna.svg/180px-Escudo_CA_Osasuna.svg.png" },
    { name: "셀타 비고", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/1/12/RC_Celta_de_Vigo_logo.svg/180px-RC_Celta_de_Vigo_logo.svg.png" },
    { name: "에스파뇰", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/7/76/RCD_Espanyol_logo.svg/180px-RCD_Espanyol_logo.svg.png" },
    { name: "헤타페", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/8/83/Escudo_del_Getafe_Club_de_F%C3%BAtbol.svg/180px-Escudo_del_Getafe_Club_de_F%C3%BAtbol.svg.png" },
    { name: "라요 바예카노", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/1/17/Rayo_Vallecano_logo.svg/180px-Rayo_Vallecano_logo.svg.png" },
    { name: "레반테", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/7/7b/Levante_Uni%C3%B3n_Deportiva%2C_S.A.D._logo.svg/180px-Levante_Uni%C3%B3n_Deportiva%2C_S.A.D._logo.svg.png" },
    { name: "알라베스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/2/2e/Deportivo_Alaves_logo.svg/180px-Deportivo_Alaves_logo.svg.png" },
    { name: "마요르카", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e0/Rcd_mallorca.svg/180px-Rcd_mallorca.svg.png" },
    { name: "카디스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e2/C%C3%A1diz_CF_logo.svg/180px-C%C3%A1diz_CF_logo.svg.png" },
    { name: "그라나다", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c5/Granada_CF_logo.svg/180px-Granada_CF_logo.svg.png" },
    { name: "엘체", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a7/Elche_CF_logo.svg/180px-Elche_CF_logo.svg.png" }
  ],
  
  // 분데스리가 (독일)
  bundesliga: [
    { name: "바이에른 뮌헨", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/180px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png" },
    { name: "도르트문트", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/180px-Borussia_Dortmund_logo.svg.png" },
    { name: "라이프치히", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/0/04/RB_Leipzig_2014_logo.svg/180px-RB_Leipzig_2014_logo.svg.png" },
    { name: "레버쿠젠", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/5/59/Bayer_04_Leverkusen_logo.svg/180px-Bayer_04_Leverkusen_logo.svg.png" },
    { name: "볼프스부르크", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Logo-VfL-Wolfsburg.svg/180px-Logo-VfL-Wolfsburg.svg.png" },
    { name: "묀헨글라트바흐", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/180px-Borussia_M%C3%B6nchengladbach_logo.svg.png" },
    { name: "프랑크푸르트", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Eintracht_Frankfurt_Logo.svg/180px-Eintracht_Frankfurt_Logo.svg.png" },
    { name: "슈투트가르트", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/VfB_Stuttgart_1893_Logo.svg/180px-VfB_Stuttgart_1893_Logo.svg.png" },
    { name: "프라이부르크", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/6/6d/SC_Freiburg_logo.svg/180px-SC_Freiburg_logo.svg.png" },
    { name: "호펜하임", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_TSG_Hoffenheim.svg/180px-Logo_TSG_Hoffenheim.svg.png" },
    { name: "유니온 베를린", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/44/1._FC_Union_Berlin_logo.svg/180px-1._FC_Union_Berlin_logo.svg.png" },
    { name: "마인츠", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/1._FSV_Mainz_05_logo.svg/180px-1._FSV_Mainz_05_logo.svg.png" },
    { name: "쾰른", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/5/53/FC_Cologne_logo.svg/180px-FC_Cologne_logo.svg.png" },
    { name: "헤르타 베를린", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/5/5b/Hertha_BSC_Logo_2012.svg/180px-Hertha_BSC_Logo_2012.svg.png" },
    { name: "아우크스부르크", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c5/FC_Augsburg_logo.svg/180px-FC_Augsburg_logo.svg.png" },
    { name: "베르더 브레멘", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SV-Werder-Bremen-Logo.svg/180px-SV-Werder-Bremen-Logo.svg.png" },
    { name: "아르미니아 빌레펠트", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e3/Arminia_Bielefeld_logo.svg/180px-Arminia_Bielefeld_logo.svg.png" },
    { name: "보훔", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Vfl_bochum_logo.svg/180px-Vfl_bochum_logo.svg.png" }
  ],
  
  // 세리에A (이탈리아)
  serieA: [
    { name: "유벤투스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/d/d2/Juventus_FC_2017_logo.svg/180px-Juventus_FC_2017_logo.svg.png" },
    { name: "인테르 밀란", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/180px-FC_Internazionale_Milano_2021.svg.png" },
    { name: "AC 밀란", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/180px-Logo_of_AC_Milan.svg.png" },
    { name: "나폴리", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Neapel.svg/180px-SSC_Neapel.svg.png" },
    { name: "AS 로마", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f7/AS_Roma_logo_%282017%29.svg/180px-AS_Roma_logo_%282017%29.svg.png" },
    { name: "라치오", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e4/SS_Lazio.svg/180px-SS_Lazio.svg.png" },
    { name: "아탈란타", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/6/66/AtalantaBC.svg/180px-AtalantaBC.svg.png" },
    { name: "피오렌티나", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/ACF_Fiorentina.svg/180px-ACF_Fiorentina.svg.png" },
    { name: "사수올로", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e3/US_Sassuolo_Calcio_logo.svg/180px-US_Sassuolo_Calcio_logo.svg.png" },
    { name: "베로나", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/180px-Hellas_Verona_FC_logo_%282020%29.svg.png" },
    { name: "토리노", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/2/2e/Torino_FC_Logo.svg/180px-Torino_FC_Logo.svg.png" },
    { name: "볼로냐", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/9/92/Bologna_FC_1909_logo.svg/180px-Bologna_FC_1909_logo.svg.png" },
    { name: "삼프도리아", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/d/d0/UC_Sampdoria_logo.svg/180px-UC_Sampdoria_logo.svg.png" },
    { name: "우디네세", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c1/Udinese_Calcio_logo.svg/180px-Udinese_Calcio_logo.svg.png" },
    { name: "제노아", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/46/Genoa_CFC_logo.svg/180px-Genoa_CFC_logo.svg.png" },
    { name: "칼리아리", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/6/61/Cagliari_Calcio_1920.svg/180px-Cagliari_Calcio_1920.svg.png" },
    { name: "스페치아", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/a/aa/Spezia_Calcio.svg/180px-Spezia_Calcio.svg.png" },
    { name: "베네치아", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/d/d0/Venezia_FC_logo.svg/180px-Venezia_FC_logo.svg.png" },
    { name: "엠폴리", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c4/Empoli_FC.svg/180px-Empoli_FC.svg.png" },
    { name: "살레르니타나", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/4f/US_Salernitana_1919_logo.svg/180px-US_Salernitana_1919_logo.svg.png" }
  ],
  
  // 리그1 (프랑스)
  ligue1: [
    { name: "파리 생제르맹", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a7/Paris_Saint-Germain_F.C..svg/180px-Paris_Saint-Germain_F.C..svg.png" },
    { name: "릴", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e1/LOSC_Lille_logo.svg/180px-LOSC_Lille_logo.svg.png" },
    { name: "모나코", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/b/ba/AS_Monaco_FC.svg/180px-AS_Monaco_FC.svg.png" },
    { name: "리옹", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/c/c6/Olympique_Lyonnais.svg/180px-Olympique_Lyonnais.svg.png" },
    { name: "마르세유", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/43/Olympique_de_Marseille_logo.svg/180px-Olympique_de_Marseille_logo.svg.png" },
    { name: "렌", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/e/e9/Logo_Stade_Rennais_FC.svg/180px-Logo_Stade_Rennais_FC.svg.png" },
    { name: "니스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/2/2e/OGC_Nice_logo.svg/180px-OGC_Nice_logo.svg.png" },
    { name: "랑스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/7/7c/Stade_de_Reims_logo.svg/180px-Stade_de_Reims_logo.svg.png" },
    { name: "몽펠리에", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a8/Montpellier_HSC_logo.svg/180px-Montpellier_HSC_logo.svg.png" },
    { name: "메스", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/1/1a/FC_Metz_logo.svg/180px-FC_Metz_logo.svg.png" },
    { name: "앙제", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/d/d7/Angers_SCO_logo.svg/180px-Angers_SCO_logo.svg.png" },
    { name: "스트라스부르", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/8/80/RC_Strasbourg_logo.svg/180px-RC_Strasbourg_logo.svg.png" },
    { name: "보르도", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/7/76/FC_Girondins_de_Bordeaux_logo.svg/180px-FC_Girondins_de_Bordeaux_logo.svg.png" },
    { name: "낭트", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/45/FC_Nantes_logo.svg/180px-FC_Nantes_logo.svg.png" },
    { name: "생테티엔", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/2/2c/AS_Saint-%C3%89tienne_logo.svg/180px-AS_Saint-%C3%89tienne_logo.svg.png" },
    { name: "브레스트", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/0/0a/Stade_Brestois_29_logo.svg/180px-Stade_Brestois_29_logo.svg.png" },
    { name: "로리앙", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/4c/FC_Lorient_logo.svg/180px-FC_Lorient_logo.svg.png" },
    { name: "트루아", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/b/bf/ES_Troyes_AC.svg/180px-ES_Troyes_AC.svg.png" },
    { name: "클레르몽", logo: "https://upload.wikimedia.org/wikipedia/ko/thumb/9/90/Clermont_Foot_63_logo.svg/180px-Clermont_Foot_63_logo.svg.png" }
  ]
};
