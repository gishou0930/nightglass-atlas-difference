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

export function renderArtwork(plate, alternate = false, side = 'left') {
  const prefix = `${plate.id}-${side}`;
  const renderers = { glasshouse: drawGlasshouse, orchard: drawOrchard, archive: drawArchive };
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
