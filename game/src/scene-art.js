function skyAndFrame(prefix, colors) {
  return `
    <defs>
      <linearGradient id="sky-${prefix}" x1="0" y1="0" x2=".9" y2="1">
        <stop offset="0" stop-color="${colors[0]}"/><stop offset=".57" stop-color="${colors[1]}"/><stop offset="1" stop-color="${colors[2]}"/>
      </linearGradient>
      <linearGradient id="glass-${prefix}" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#b9d6bd" stop-opacity=".25"/><stop offset="1" stop-color="#e6ce98" stop-opacity=".04"/>
      </linearGradient>
      <linearGradient id="gold-${prefix}" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#f5d58c"/><stop offset="1" stop-color="#a96a3b"/>
      </linearGradient>
    </defs>
    <rect width="720" height="450" fill="url(#sky-${prefix})"/>
    <path d="M0 327 Q95 270 190 317T380 308T560 300T720 318V450H0Z" fill="#1e393d" opacity=".72"/>
    <path d="M0 365 Q145 317 260 352T500 338T720 358V450H0Z" fill="#294b45" opacity=".83"/>
    <rect x="10" y="10" width="700" height="430" rx="18" fill="none" stroke="#f1d398" stroke-opacity=".55" stroke-width="2"/>
    <path d="M24 23h42M24 23v42M696 23h-42M696 23v42M24 427h42M24 427v-42M696 427h-42M696 427v-42" fill="none" stroke="#f4d99e" stroke-opacity=".72" stroke-width="2"/>
  `;
}

function star(x, y, size, opacity = .86) {
  return `<path d="M${x} ${y - size} Q${x + 1} ${y - 1} ${x + size} ${y} Q${x + 1} ${y + 1} ${x} ${y + size} Q${x - 1} ${y + 1} ${x - size} ${y} Q${x - 1} ${y - 1} ${x} ${y - size}" fill="#f8e2ae" opacity="${opacity}"/>`;
}

function flower(cx, cy, color, petals = 5, scale = 1) {
  const blooms = Array.from({ length: petals }, (_, i) => {
    const angle = (i * 360) / petals;
    return `<ellipse cx="${cx}" cy="${cy - 7 * scale}" rx="4.5" ry="8" fill="${color}" transform="rotate(${angle} ${cx} ${cy})"/>`;
  }).join('');
  return `<g>${blooms}<circle cx="${cx}" cy="${cy}" r="4.5" fill="#f3d58e"/><path d="M${cx} ${cy + 2}v17m0-9q-9-6-12 0m12-4q8-6 12-1" fill="none" stroke="#527451" stroke-width="3" stroke-linecap="round"/></g>`;
}

function moth(x, y, alternate) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0 0C-23-25-35-14-27 0-34 15-18 21 0 5 18 21 34 15 27 0 35-14 23-25 0 0Z" fill="#e9c77f" stroke="#fff0c2" stroke-width="2"/>
    <path d="M-2-1Q-18-22-26-9M2-1Q18-22 26-9" fill="none" stroke="#a27652" stroke-width="1.5" opacity=".85"/>
    <ellipse cx="0" cy="2" rx="4" ry="12" fill="#6f5649"/>
    <path d="M-2-8q-7-11-12-8m16 8q7-11 12-8" fill="none" stroke="#6f5649" stroke-width="1.6" stroke-linecap="round"/>
    ${alternate ? '<circle cx="-16" cy="2" r="2.5" fill="#67877b"/>' : '<circle cx="-17" cy="1" r="4" fill="#67877b"/>'}
  </g>`;
}

function drawGlasshouse(alternate, prefix) {
  return `
    ${skyAndFrame(prefix, ['#202744', '#556b6c', '#d17d61'])}
    ${star(91,75,3)}${star(154,119,2,.68)}${star(275,61,2.5)}${star(487,100,2)}${star(636,122,2.5,.72)}${star(326,91,1.7,.75)}
    <circle cx="584" cy="82" r="30" fill="#f3d99a" opacity=".94"/>
    <circle cx="574" cy="71" r="30" fill="#66777a" opacity="${alternate ? '.56' : '.72'}"/>
    ${alternate ? '<circle cx="605" cy="58" r="4" fill="#fff0c6"/>' : '<path d="M604 65q5 4 8 0m-13-17q3-3 6 0" fill="none" stroke="#fff0c6" stroke-width="2" stroke-linecap="round"/>'}
    <path d="M54 358V222Q54 82 360 44Q666 82 666 222V358" fill="url(#glass-${prefix})" stroke="#c6b88f" stroke-width="10"/>
    <path d="M56 218Q360 60 664 218M80 155Q360 39 640 155M118 112Q360 32 602 112" fill="none" stroke="#e0c990" stroke-opacity=".72" stroke-width="5"/>
    <path d="M174 116Q145 240 152 352M270 75Q245 235 249 357M360 46V359M450 75Q475 235 471 357M546 116Q575 240 568 352" fill="none" stroke="#b5ad83" stroke-opacity=".75" stroke-width="4"/>
    <path d="M28 358H692V409H28Z" fill="#3d4c3e"/><path d="M28 358H692" stroke="#d3b77d" stroke-width="5"/>
    <path d="M39 386q85-21 170 0t171 0t171 0t171 0" fill="none" stroke="#8f8467" stroke-width="2" opacity=".62"/>
    <path d="M74 316q20-44 39-12t18 54H66Z" fill="#31594b"/><path d="M96 306q-21-45-34-25m50 18q21-44 38-26m-50 7q-1-44 18-55" fill="none" stroke="#90ad72" stroke-width="7" stroke-linecap="round"/>
    ${alternate ? '<path d="M100 272q-15-20-28-17" fill="none" stroke="#a6c07b" stroke-width="7" stroke-linecap="round"/>' : ''}
    <path d="M593 307q-8-38 14-52 23 17 12 59l-8 10Z" fill="#456c50"/><path d="M606 303q-26-10-28-29m43 20q21-21 35-14" fill="none" stroke="#9bb57c" stroke-width="6" stroke-linecap="round"/>
    <path d="M75 362v-47h76v47M82 316q25-29 66 0" fill="#9c744b" stroke="#523f35" stroke-width="4"/><path d="M82 330h62" stroke="#dbb571" stroke-width="3"/>
    <path d="M181 359v-40h57v40" fill="#8e5d4d"/><path d="M176 319h67l-8 16h-52Z" fill="#b8815f" stroke="#5f4b3e" stroke-width="3"/>
    ${flower(210,289, alternate ? '#f4dfa3' : '#d88870', alternate ? 6 : 5, .94)}
    <path d="M302 354v-58h98v58" fill="#786448" stroke="#473d35" stroke-width="4"/><path d="M294 297h114v15H294Z" fill="#d0ad70"/>
    <path d="M320 294q-7-29 4-43m18 43q2-38 20-49m12 49q12-26 28-26" fill="none" stroke="#547b56" stroke-width="5" stroke-linecap="round"/>
    <path d="M317 272q-16-2-20-14m30-3q-1-18 11-22m15 13q14-13 27-7m12 21q13-12 25-6" fill="none" stroke="#a6be84" stroke-width="8" stroke-linecap="round"/>
    <path d="M437 355v-50h60v50" fill="#b08055"/><path d="M432 306h70l-8 13h-54Z" fill="#d7b87d"/><path d="M464 304v-82" stroke="#d2a760" stroke-width="3"/>
    <path d="M451 230q13-27 26 0l-13 25Z" fill="${alternate ? '#eab94d' : '#b8d8be'}" stroke="#f4d99e" stroke-width="2"/>
    <circle cx="${alternate ? 465 : 464}" cy="242" r="4" fill="#fff0b5"/>
    <path d="M511 343h35q14 0 13 14l-5 7h-47l-7-8q0-12 11-13Z" fill="#b28b60" stroke="#604936" stroke-width="3"/>
    <path d="M546 349q24-10 20-25" fill="none" stroke="#d2b07b" stroke-width="5" stroke-linecap="round"/>
    ${alternate ? '<path d="M516 344q-18-15-26-22" fill="none" stroke="#d2b07b" stroke-width="5" stroke-linecap="round"/>' : ''}
    <path d="M620 329q-23-9-21-28 20-13 39 1 6 20-18 27Z" fill="#7b8d85" stroke="#e2d3ac" stroke-width="3"/>
    <ellipse cx="620" cy="330" rx="23" ry="6" fill="#baa777"/><circle cx="${alternate ? 615 : 622}" cy="307" r="3" fill="#f6e4a5"/><circle cx="${alternate ? 628 : 0}" cy="299" r="3" fill="#f6e4a5" opacity="${alternate ? 1 : 0}"/>
    <path d="M346 376h62m-53 0v-16m43 16v-16" stroke="#b99865" stroke-width="6" stroke-linecap="round"/>
    <path d="M334 360h86l-8 14h-70Z" fill="#8b6549" stroke="#574636" stroke-width="3"/>
    ${moth(358,208, alternate)}
    <path d="M552 414q12-17 21 0m-42 0q5-9 10 0m-285-4q6-10 13 0" fill="none" stroke="#e0bb7c" stroke-width="2" opacity=".75"/>
  `;
}

function drawOrchard(alternate, prefix) {
  return `
    ${skyAndFrame(prefix, ['#282b52', '#716b81', '#e6a96e'])}
    ${star(88,79,3)}${star(162,130,2)}${star(313,70,2.5)}${star(435,122,2)}${star(649,114,2.7)}${star(529,61,1.8,.8)}
    <circle cx="577" cy="79" r="29" fill="#e8c48f"/><ellipse cx="577" cy="79" rx="47" ry="10" fill="none" stroke="#eecf9d" stroke-width="3" transform="rotate(-24 577 79)"/>
    ${alternate ? '<ellipse cx="577" cy="79" rx="47" ry="10" fill="none" stroke="#eecf9d" stroke-width="3" transform="rotate(24 577 79)"/>' : ''}
    <path d="M80 316Q164 250 237 289Q307 220 385 281Q480 238 554 292Q612 268 674 315L645 374H91Z" fill="#3d5a4a" stroke="#d2b17b" stroke-width="5"/>
    <path d="M104 330Q360 274 648 325" fill="none" stroke="#8ba176" stroke-width="4"/>
    <path d="M347 295Q331 234 358 188Q378 146 351 104Q393 136 391 185Q423 231 394 296Z" fill="#72513e" stroke="#d2b27d" stroke-width="5"/>
    <path d="M363 219Q302 186 280 151M377 195Q442 168 469 132M365 247Q430 219 492 221M359 184Q323 119 301 101" fill="none" stroke="#9b6c4b" stroke-width="9" stroke-linecap="round"/>
    <path d="M225 190Q235 111 308 130Q355 65 411 128Q475 94 508 157Q570 164 548 226Q479 257 408 229Q325 256 255 225Z" fill="#547454" stroke="#d2b27d" stroke-width="4"/>
    <path d="M270 180q25-50 62-25m27-38q29-30 54 6m35 3q26-14 46 14m-185 49q32-29 63-9m114 17q26-30 53-7" fill="none" stroke="#a7bd80" stroke-width="8" stroke-linecap="round"/>
    <circle cx="308" cy="162" r="16" fill="#d98369" stroke="#f0d19a" stroke-width="4"/><circle cx="423" cy="146" r="18" fill="#d7a14f" stroke="#f0d19a" stroke-width="4"/>
    <circle cx="${alternate ? 494 : 494}" cy="192" r="16" fill="${alternate ? '#9e6ec0' : '#d98369'}" stroke="#f0d19a" stroke-width="4"/>
    <path d="M296 168q10-10 20 0m-3-13v9m115-13q10-10 20 0m-4-13v9" fill="none" stroke="#753f4b" stroke-width="2"/>
    ${alternate ? '<path d="M480 184q12-13 25-1m-12-9v13" fill="none" stroke="#753f4b" stroke-width="2"/>' : ''}
    <path d="M127 325q4-68 49-70 45 14 38 75Z" fill="#617d78" stroke="#e1cf9f" stroke-width="4"/>
    <path d="M142 276l-4-21m29 18 12-18" stroke="#c8ae75" stroke-width="5" stroke-linecap="round"/>
    <circle cx="151" cy="290" r="3" fill="#f7dd9b"/><circle cx="176" cy="289" r="3" fill="#f7dd9b"/>
    <path d="M97 338h70l-8 17h-55Z" fill="#a56d55"/><path d="M111 338v-27m22 27v-34m21 34v-24" stroke="#8ab17c" stroke-width="5" stroke-linecap="round"/>
    <path d="M535 334q23-52 55-17 18 24 5 47h-64Z" fill="#516e55"/><path d="M553 338q-28-18-26-36m50 40q25-20 39-10" fill="none" stroke="#9db47b" stroke-width="7" stroke-linecap="round"/>
    <path d="M589 332q17-23 29-9-2 20-23 23Z" fill="#f4d99b" stroke="#65795e" stroke-width="3"/>
    <path d="M60 349h70v-9q0-18-19-18H78q-18 0-18 18Z" fill="#8d6549" stroke="#493e38" stroke-width="4"/><circle cx="${alternate ? 116 : 101}" cy="330" r="7" fill="#e3c078" stroke="#604936" stroke-width="2"/>
    <path d="M99 324v-42m-4 0h33" stroke="#d7bd8b" stroke-width="4" stroke-linecap="round"/>
    <path d="M377 221q10-${alternate ? 19 : 12} 20 0-10 ${alternate ? 21 : 13}-20 0m10-7v14" fill="${alternate ? '#d98968' : '#e5c77d'}" stroke="#f3d79d" stroke-width="2"/>
    ${moth(250,135, alternate)}
    ${alternate ? '<path d="M319 382q17-24 35 0l-17 11Z" fill="#d4865b" stroke="#f1d398" stroke-width="2"/><path d="M336 382v-32m-1 12q-18-14-25-7m27 1q18-18 29-9" fill="none" stroke="#d9c28f" stroke-width="2"/>' : '<path d="M319 382q17-24 35 0l-17 11Z" fill="#d4865b" stroke="#f1d398" stroke-width="2"/><path d="M336 382v-32m-1 12q-18-14-25-7m27 1q18-18 29-9" fill="none" stroke="#d9c28f" stroke-width="2"/><path d="M336 379l-9-5m9 5 10-8" stroke="#f2e2b4" stroke-width="2"/>'}
    ${flower(614,315, alternate ? '#d88a79' : '#edc76e', alternate ? 6 : 5, .88)}
    <path d="M105 393q45-17 91 0m450 0q21-12 41 0" fill="none" stroke="#d2b17b" stroke-width="3" opacity=".75"/>
  `;
}

function drawArchive(alternate, prefix) {
  return `
    ${skyAndFrame(prefix, ['#192b43', '#645c68', '#d58b61'])}
    <path d="M445 70Q555 25 660 70V300H445Z" fill="#294250" stroke="#dabd86" stroke-width="8"/>
    <path d="M465 289V116Q465 70 553 52Q640 70 640 116V289" fill="#617985" stroke="#cdb788" stroke-width="5"/>
    <path d="M553 54V287M467 178h172" stroke="#d3bd8f" stroke-width="5"/>
    <circle cx="553" cy="101" r="3.5" fill="#f3d99c"/><circle cx="${alternate ? 554 : 0}" cy="${alternate ? 89 : 0}" r="3.5" fill="#f3d99c" opacity="${alternate ? 1 : 0}"/>
    ${star(498,138,2)}${star(603,132,2.5)}${star(525,222,2,.72)}
    <path d="M0 330H720V450H0Z" fill="#40383c" opacity=".75"/>
    <path d="M54 97h294v281H54Z" fill="#59443c" stroke="#d4b67c" stroke-width="7"/>
    <path d="M69 115h264v64H69ZM69 195h264v64H69ZM69 275h264v84H69Z" fill="#765849" stroke="#b28d60" stroke-width="4"/>
    <path d="M80 169v-44h28v44m9 0v-50h36v50m11 0v-37h26v37m11 0v-48h37v48m12 0v-34h36v34m12 0v-51h33v51" fill="#d3b878" stroke="#573f3b" stroke-width="3"/>
    <path d="M84 250v-41h31v41m12 0v-46h24v46m11 0v-34h38v34m12 0v-43h28v43m11 0v-49h35v49m11 0v-32h31v32" fill="#8a5962" stroke="#503d3b" stroke-width="3"/>
    <path d="M83 354v-62h28v62m10 0v-54h34v54m9 0v-67h24v67m11 0v-48h34v48m12 0v-58h31v58m12 0v-43h41v43" fill="#739090" stroke="#514447" stroke-width="3"/>
    ${alternate ? '<path d="M123 250v-46h24v46" fill="#4f88a4" stroke="#503d3b" stroke-width="3"/>' : ''}
    <path d="M349 106h61v241h-61Z" fill="#6e5648" stroke="#d6b87d" stroke-width="4"/>
    <path d="M357 126h45m-45 25h45m-45 25h45m-45 25h45m-45 25h45m-45 25h45m-45 25h45" stroke="#c6a269" stroke-width="4"/>
    <path d="M334 343h91m-70 0v-25m46 25v-25" stroke="#d3b77c" stroke-width="6" stroke-linecap="round"/>
    ${alternate ? '<path d="M354 300h58" stroke="#bd9560" stroke-width="5" stroke-linecap="round"/>' : ''}
    <path d="M294 115V91q0-31 32-31t32 31v24Z" fill="url(#gold-${prefix})" stroke="#56483d" stroke-width="4"/>
    <path d="M302 114h48" stroke="#f4daa0" stroke-width="4"/>
    <path d="M326 116v${alternate ? '31' : '24'}" stroke="#d7b272" stroke-width="4"/>
    <circle cx="326" cy="${alternate ? 151 : 144}" r="6" fill="#d89c59" stroke="#f3d798" stroke-width="2"/>
    <path d="M454 317q8-44 45-34 35 10 34 56h-81Z" fill="#87947d" stroke="#e0c99a" stroke-width="4"/>
    <path d="M460 320q17-26 32-5m9 2q18-24 28-1" fill="#d8c486"/>
    <circle cx="477" cy="286" r="${alternate ? 9 : 7}" fill="${alternate ? '#e9a66a' : '#f7dc98'}"/><circle cx="499" cy="286" r="7" fill="#f7dc98"/>
    <circle cx="${alternate ? 476 : 477}" cy="286" r="2.5" fill="#33434a"/><circle cx="499" cy="286" r="2.5" fill="#33434a"/>
    <path d="M473 303q12 9 24 0" fill="none" stroke="#3e4c43" stroke-width="2"/>
    <path d="M605 365v-29q0-14 12-14t12 14v29Z" fill="#be8a51" stroke="#59453b" stroke-width="3"/>
    <path d="M617 324q-12-12 0-22 12 10 0 22Z" fill="${alternate ? '#fff2c7' : '#e8b86c'}" stroke="#f8dfaa" stroke-width="2"/>
    <path d="M590 365h55" stroke="#d4b67c" stroke-width="4"/>
    <path d="M420 358q19-15 37 0l-4 24h-28Z" fill="#916349" stroke="#56433d" stroke-width="3"/>
    <path d="M426 358v-9m10 9v-11m9 11v-8" stroke="#dfbf80" stroke-width="2"/>
    <path d="M423 380q-11 16 8 21m24-22q15 13-2 22" fill="none" stroke="#d0ad73" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${alternate ? 445 : 445}" cy="376" r="4" fill="${alternate ? '#d55e50' : '#d1c072'}"/>
    <path d="M78 390h257" stroke="#d7bd86" stroke-width="4" opacity=".7"/>
    ${star(381,70,2)}${star(412,84,2.2,.72)}
  `;
}

function drawMoonroof(alternate, prefix) {
  return `
    ${skyAndFrame(prefix, ['#1c2944', '#606782', '#c58067'])}
    ${star(83,93,3)}${star(144,131,2)}${star(225,75,2.5)}${star(321,112,1.8,.75)}${star(442,72,2)}${star(657,129,2.5,.72)}${star(529,144,2,.7)}
    <path d="M0 282Q95 245 185 277T365 269T545 271T720 254V450H0Z" fill="#394753" opacity=".77"/>
    <path d="M0 325h720v125H0Z" fill="#34404a"/>
    <path d="M32 324h656M49 354h622M68 384h584" stroke="#b99669" stroke-width="3" opacity=".64"/>
    <path d="M87 324v-27h28v27m27 0v-44h40v44m397 0v-31h35v31m26 0v-51h45v51" fill="#526272" stroke="#c1a779" stroke-width="3"/>
    <circle cx="574" cy="88" r="29" fill="#f2d79a" opacity=".94"/>
    <path d="M559 81q13-12 28 0m-26 12q11-8 23 0" fill="none" stroke="#c28d5f" stroke-width="2" opacity=".72"/>
    ${alternate ? '<ellipse cx="574" cy="88" rx="44" ry="10" fill="none" stroke="#f3d89f" stroke-width="3" transform="rotate(-24 574 88)"/>' : ''}
    <path d="M104 337V235Q104 150 200 150H520Q616 150 616 235V337" fill="#425969" stroke="#d4b77d" stroke-width="8"/>
    <path d="M128 333V239Q128 174 204 174H516Q592 174 592 239V333" fill="#304656" stroke="#a98e65" stroke-width="4"/>
    <path d="M150 323V244Q150 191 211 191H509Q570 191 570 244V323" fill="#526777" stroke="#d2b67f" stroke-width="3"/>
    <path d="M192 323V248Q192 217 230 217H490Q528 217 528 248V323" fill="#334c5b" stroke="#b69b6d" stroke-width="3"/>
    <path d="M211 322v-45m298 45v-45M131 322h461" stroke="#d7bd87" stroke-width="4"/>
    <path d="M345 322V222M357 322V222M369 322V222" stroke="#9d8968" stroke-width="2" opacity=".8"/>
    <path d="M70 338h580" stroke="#ead29b" stroke-width="5"/>
    <path d="M92 339v36m74-36v36m390-36v36m74-36v36" stroke="#c6a879" stroke-width="4"/>
    <circle cx="351" cy="201" r="39" fill="#30414b" stroke="#e0c38c" stroke-width="5"/>
    <ellipse cx="351" cy="201" rx="49" ry="17" fill="none" stroke="#c4a66e" stroke-width="3" transform="rotate(-29 351 201)"/>
    <ellipse cx="351" cy="201" rx="49" ry="17" fill="none" stroke="#c4a66e" stroke-width="3" transform="rotate(29 351 201)"/>
    <circle cx="351" cy="201" r="22" fill="#647b7c" stroke="#e4cd97" stroke-width="3"/>
    <path d="M351 201L${alternate ? '373 184' : '351 174'}M351 201L${alternate ? '329 220' : '351 229'}" stroke="#f5d996" stroke-width="4" stroke-linecap="round"/>
    <circle cx="351" cy="201" r="5" fill="#eac275"/>
    <path d="M122 300 201 238" stroke="#ba8c58" stroke-width="16" stroke-linecap="round"/>
    <path d="M122 300 201 238" stroke="#e1c38a" stroke-width="5" stroke-linecap="round"/>
    <circle cx="179" cy="252" r="12" fill="${alternate ? '#f2d896' : '#91afb0'}" stroke="#f1d89e" stroke-width="4"/>
    <circle cx="179" cy="252" r="4" fill="#fff0c2" opacity=".85"/>
    <path d="M119 301h92m-75 0 14 33m54-96 28-25" stroke="#c6aa77" stroke-width="5" stroke-linecap="round"/>
    <path d="M589 224V171" stroke="#d5bc89" stroke-width="4"/>
    <path d="M590 175l${alternate ? '28 5-24 19-4-24Z' : '27-4-14 19-13-15Z'}" fill="${alternate ? '#d78c70' : '#e5ca91'}" stroke="#f2dca9" stroke-width="2"/>
    <circle cx="589" cy="170" r="7" fill="#d8b679" stroke="#f2dca9" stroke-width="2"/>
    <path d="M452 336q0-38 40-40 37 4 42 40Z" fill="#9c795d" stroke="#e2c58a" stroke-width="4"/>
    <path d="M466 308l9-14 12 12 10-13 12 14" fill="#9c795d" stroke="#e2c58a" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="476" cy="315" r="3" fill="#f6dfaa"/><circle cx="499" cy="315" r="3" fill="#f6dfaa"/>
    <path d="M${alternate ? '531 323q28-30 4-39-17-5-20 12' : '531 323q19 17 28-1 6-13-5-20'}" fill="none" stroke="#d8b77a" stroke-width="5" stroke-linecap="round"/>
    <path d="M567 338v-25q0-17 23-17t23 17v25Z" fill="#82654f" stroke="#d6bc84" stroke-width="4"/>
    <path d="M592 301q-12-13 0-25 12 12 0 25Z" fill="${alternate ? '#f4d98f' : '#e7aa60'}" stroke="#ffe8b2" stroke-width="2"/>
    <path d="M575 338h31" stroke="#e4cb96" stroke-width="4"/>
    ${moth(267,164,alternate)}
    <path d="M240 344q26-23 52 0h-52Zm182 0q17-15 34 0h-34Z" fill="#607257" stroke="#ddc68e" stroke-width="3"/>
    <path d="M253 343v-17m14 17v-24m15 24v-13m148 13v-19m15 19v-15" stroke="#a1b27b" stroke-width="3" stroke-linecap="round"/>
    <path d="M42 410q95-19 190 0t190 0 190 0 84 0" fill="none" stroke="#cfb47d" stroke-width="2" opacity=".55"/>
  `;
}

function drawHarbor(alternate, prefix) {
  return `
    ${skyAndFrame(prefix, ['#1d2b43', '#4b7278', '#d18b6c'])}
    ${star(76,82,2.5)}${star(188,109,2)}${star(322,68,2.4)}${star(469,106,2)}${star(656,93,2.2)}
    <circle cx="590" cy="84" r="27" fill="#f3d99a" opacity=".95"/>
    ${alternate ? '<ellipse cx="590" cy="84" rx="40" ry="11" fill="none" stroke="#f4dfaa" stroke-width="3" transform="rotate(-22 590 84)"/>' : ''}
    <path d="M0 249Q82 217 158 242T310 235T468 241T720 222V450H0Z" fill="#294650" opacity=".88"/>
    <path d="M0 291Q117 267 226 291T448 284T720 277V450H0Z" fill="#355b5a"/>
    <path d="M0 339q70-14 140 0t140 0t140 0t140 0t160 0" fill="none" stroke="#8bb0a2" stroke-width="3" opacity=".5"/>
    <path d="M0 380q88-17 176 0t176 0t176 0t192 0" fill="none" stroke="#b0b08a" stroke-width="2" opacity=".55"/>
    <path d="M27 236V181h43v55m18 0v-74h53v74m28 0v-49h41v49m392 0v-68h46v68m25 0v-91h54v91" fill="#455b62" stroke="#c6ae7d" stroke-width="3"/>
    <rect x="39" y="201" width="14" height="17" rx="2" fill="${alternate ? '#fff0bd' : '#c88e66'}" stroke="#dfc18a" stroke-width="2"/>
    <path d="M86 177h52l-26-31Z M591 168h46l-23-29Z M638 145h54l-27-29Z" fill="#816451" stroke="#cfb47d" stroke-width="3"/>
    <path d="M102 236V158Q102 129 132 117V97h34v20q30 12 30 41v78Z" fill="#d6bf91" stroke="#65534b" stroke-width="4"/>
    <path d="M117 236V161q0-31 32-40 33 9 33 40v75Z" fill="#637579"/>
    <path d="M107 159h78M132 120V98h32v22" fill="none" stroke="#f1d89f" stroke-width="4"/>
    <path d="M149 98V77" stroke="#e3cf9c" stroke-width="3"/>
    <path d="M149 79l${alternate ? '20 6-19 12-1-18Z' : '16-5-16 11v-6Z'}" fill="#d98e70" stroke="#f4d797" stroke-width="2"/>
    <rect x="101" y="184" width="20" height="21" rx="3" fill="${alternate ? '#fff1be' : '#d7a870'}" stroke="#f5d797" stroke-width="3"/>
    <path d="M96 236h90" stroke="#d9bd82" stroke-width="5"/>
    <path d="M80 240h190v18H80Z" fill="#78644f"/><path d="M92 258v86m166-86v86" stroke="#c4a779" stroke-width="8"/>
    <path d="M294 262q61-28 125 0l-18 37h-90Z" fill="#344b59" stroke="#dbbf88" stroke-width="4"/>
    <path d="M418 296v13m-8-7h16m-15 1q6 11 15 0" fill="none" stroke="${alternate ? '#f2d496' : '#a28b67'}" stroke-width="3" stroke-linecap="round"/>
    <path d="M305 264q48 17 103 0M348 260v-77" fill="none" stroke="#d7ba83" stroke-width="4"/>
    <path d="M348 188v42" stroke="#e3cf9c" stroke-width="3"/>
    <path d="M348 190l${alternate ? '22 8-21 12-1-20Z' : '19-5-19 14-1-9Z'}" fill="#dc9872" stroke="#f3d69c" stroke-width="2"/>
    <circle cx="391" cy="270" r="11" fill="#f0d594" stroke="#b68859" stroke-width="3"/>
    ${alternate ? '<path d="M384 270h14m-7-7v14" stroke="#725a4a" stroke-width="2"/>' : '<circle cx="391" cy="270" r="3" fill="#725a4a"/>'}
    <path d="M493 167q19-18 41 0m-24-7q-8-17-17-18m17 18q8-18 20-18" fill="none" stroke="#e9d6ad" stroke-width="4" stroke-linecap="round"/>
    ${alternate ? '<path d="M520 165q14-15 26-11" fill="none" stroke="#f8e7bd" stroke-width="4" stroke-linecap="round"/>' : ''}
    <path d="M179 349q12-22 25 0-12 12-25 0Z" fill="#dbb87b" stroke="#f1d69f" stroke-width="3"/>
    <path d="M189 336v25m-10-16 20 8m-20 0 20-8" stroke="#8a644e" stroke-width="2"/>
    ${alternate ? '<circle cx="192" cy="347" r="3" fill="#fff0c2"/>' : ''}
    <path d="M609 276v-39q0-17 13-17t13 17v39Z" fill="#b68a59" stroke="#594b43" stroke-width="3"/>
    <path d="M622 222q-12-14 0-26 12 12 0 26Z" fill="${alternate ? '#fff0b9' : '#e0a85f'}" stroke="#f4d797" stroke-width="2"/>
    <path d="M598 278h49" stroke="#dcc08a" stroke-width="4"/>
    <path d="M451 343q25-10 51 0" fill="none" stroke="#b8c7a2" stroke-width="3" stroke-linecap="round"/>
    ${alternate ? '<path d="M474 340q18-8 35-1" fill="none" stroke="#f5d99b" stroke-width="3" stroke-linecap="round"/>' : ''}
    <path d="M30 413q90-18 180 0t180 0 180 0 120 0" fill="none" stroke="#d1b57d" stroke-width="2" opacity=".58"/>
  `;
}

function drawMaproom(alternate, prefix) {
  return `
    ${skyAndFrame(prefix, ['#202942', '#566a70', '#bd806e'])}
    ${star(77,73,2.5)}${star(645,74,2)}${star(291,103,1.8)}${star(422,92,2.2)}
    <path d="M0 289Q130 264 230 286T455 276T720 283V450H0Z" fill="#263b42" opacity=".82"/>
    <path d="M74 278V122q0-34 35-34h501q35 0 35 34v156" fill="#344650" stroke="#d0b780" stroke-width="8"/>
    <path d="M99 278V126q0-25 27-25h467q27 0 27 25v152" fill="#293b4b" stroke="#a98f67" stroke-width="4"/>
    <path d="M115 219q104-55 210 0t210 0 85 0" fill="none" stroke="#d2b980" stroke-width="3" opacity=".65"/>
    <path d="M464 120q10-12 20 0l-10 12Z" fill="${alternate ? '#f2d99d' : '#9ca9a1'}" stroke="#e4cc93" stroke-width="2"/>
    <circle cx="335" cy="142" r="3.5" fill="${alternate ? '#f8edc6' : '#8393a0'}"/>
    ${alternate ? '<path d="M322 143q13-14 26 0" fill="none" stroke="#f3d99f" stroke-width="2"/>' : ''}
    <path d="M85 278h551M108 298h506" stroke="#d3b780" stroke-width="4"/>
    <path d="M117 278v59m69-59v59m340-59v59m71-59v59" stroke="#ac9368" stroke-width="5"/>
    <path d="M206 302q154-23 308 0l-18 49H224Z" fill="#b99669" stroke="#584c43" stroke-width="4"/>
    <path d="M225 310q131-17 270 0l-14 30H238Z" fill="#e5d4a7" stroke="#f6e8c1" stroke-width="2"/>
    <path d="M264 322q55-18 109-1t91-1" fill="none" stroke="#809190" stroke-width="2" opacity=".8"/>
    <path d="M207 325h23v13h-23Z" fill="#b69465" stroke="#86684f" stroke-width="2"/>
    ${alternate ? '<path d="M211 326v11m5-11v8m5-8v11m5-11v8" stroke="#f5dcaa" stroke-width="1.5"/>' : '<path d="M211 329h15" stroke="#d5b984" stroke-width="1.5"/>'}
    <circle cx="334" cy="329" r="7" fill="${alternate ? '#e4bb72' : '#78908c'}" stroke="#f4dca2" stroke-width="2"/>
    ${alternate ? '<path d="M334 319v20m-10-10h20m-17-7 14 14m0-14-14 14" stroke="#fff0c2" stroke-width="1.5"/>' : ''}
    <path d="M293 313l10 10-10 9m73-18 8 9-9 8m57-17 9 9-8 8" fill="none" stroke="#b36f5b" stroke-width="2"/>
    <circle cx="140" cy="201" r="32" fill="#485b61" stroke="#dfc48e" stroke-width="4"/>
    <circle cx="140" cy="201" r="20" fill="#c8a96f" stroke="#f1daa0" stroke-width="3"/>
    <path d="M140 181v40m-20-20h40" stroke="#7e654f" stroke-width="2"/>
    ${alternate ? '<ellipse cx="140" cy="201" rx="44" ry="13" fill="none" stroke="#f4d89a" stroke-width="3" transform="rotate(-28 140 201)"/>' : ''}
    <path d="M564 145h30v-24q0-21-15-21t-15 21Z" fill="#d4bb89" stroke="#65564c" stroke-width="3"/>
    <circle cx="579" cy="145" r="21" fill="#3a4d56" stroke="#dfc58e" stroke-width="3"/>
    <path d="M579 145L${alternate ? '570 133' : '579 130'}M579 145l12 8" stroke="#f0d493" stroke-width="3" stroke-linecap="round"/>
    <circle cx="579" cy="145" r="3" fill="#e7c377"/>
    <path d="M414 255q17-25 33-4l-12 24-26-5Z" fill="#f0dfb9" stroke="#86684f" stroke-width="3"/>
    <path d="M418 253q18-22 28-2l-10 17-20-4Z" fill="${alternate ? '#e6c78b' : '#f0dfb9'}"/>
    <path d="M423 259q8 5 13 6" stroke="#97795a" stroke-width="2"/>
    <path d="M431 274v31" stroke="#6d5748" stroke-width="4"/>
    <path d="M436 301q10-19 24-3v20h-24Z" fill="#32444c" stroke="#c5aa77" stroke-width="3"/>
    <path d="M440 306h16" stroke="#e1c68e" stroke-width="2"/>
    ${alternate ? '<path d="M440 304q8-7 15 0" fill="none" stroke="#fff0c4" stroke-width="2"/>' : ''}
    <path d="M511 177q12-17 23-4 10 11-4 22l-16-8Z" fill="#e3c98e" stroke="#f6e5b7" stroke-width="2"/>
    <path d="M522 175q8 7 0 16" fill="none" stroke="#8f7054" stroke-width="2"/>
    ${alternate ? '<path d="M513 176l11 8-10 2" fill="none" stroke="#f9edc8" stroke-width="2"/>' : ''}
    <path d="M623 230v-33m-8 12h16m-8-12 9-8" fill="none" stroke="#d9bf89" stroke-width="3" stroke-linecap="round"/>
    <circle cx="623" cy="230" r="4" fill="#f0d394"/>
    ${alternate ? '<circle cx="623" cy="230" r="8" fill="none" stroke="#f0d394" stroke-width="2"/>' : ''}
    <path d="M242 365q12-28 36-13 19 12 24 29h-59Z" fill="#65776e" stroke="#d7bf8c" stroke-width="3"/>
    <circle cx="260" cy="352" r="2.5" fill="#f2d99c"/><circle cx="279" cy="352" r="2.5" fill="#f2d99c"/>
    <path d="M285 372q22-7 16 10-6 12-20 2" fill="none" stroke="#d5b87e" stroke-width="4" stroke-linecap="round"/>
    ${alternate ? '<path d="M285 372q15-17 25-2" fill="none" stroke="#f4dca2" stroke-width="3" stroke-linecap="round"/>' : ''}
    <path d="M66 403q135-19 270 0t270 0" fill="none" stroke="#ceb17c" stroke-width="2" opacity=".58"/>
  `;
}

export function renderArtwork(plate, alternate = false, side = 'left') {
  const prefix = `${plate.id}-${side}`;
  const renderers = { glasshouse: drawGlasshouse, orchard: drawOrchard, archive: drawArchive, moonroof: drawMoonroof, harbor: drawHarbor, maproom: drawMaproom };
  return renderers[plate.id](alternate, prefix);
}

export function renderMarkers(plate, foundIds, hintId = null) {
  const markers = [...foundIds].map((id) => {
    const item = plate.differences[id];
    return `<g class="found-marker"><circle class="marker-ring" cx="${item.x}" cy="${item.y}" r="19"/><circle class="marker-core" cx="${item.x}" cy="${item.y}" r="11"/><text class="marker-number" x="${item.x}" y="${item.y + .5}">${String(id + 1).padStart(2, '0')}</text></g>`;
  }).join('');
  const hint = hintId === null ? '' : (() => {
    const item = plate.differences[hintId];
    return `<circle class="hint-ring" cx="${item.x}" cy="${item.y}" r="29"/>`;
  })();
  return `${markers}${hint}`;
}

export function renderKeyboardCursor(cursor) {
  return `<circle class="cursor-ring" cx="${cursor.x}" cy="${cursor.y}" r="15"/><path class="cursor-cross" d="M${cursor.x - 22} ${cursor.y}h44M${cursor.x} ${cursor.y - 22}v44"/>`;
}
