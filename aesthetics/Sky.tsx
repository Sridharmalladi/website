"use client";
import { useEffect, useId, useState } from "react";
import { hourInCentral, paletteAt } from "./palette";
const stars = Array.from({ length: 76 }, (_, i) => ({
  x: 35 + ((i * 277 + i * i * 41) % 1530),
  y: 28 + ((i * 113 + i * i * 17) % 335),
  radius: i % 9 === 0 ? 1.55 : i % 3 === 0 ? 1.05 : .65,
}));
export default function Sky() {
 const [now,setNow] = useState<Date|null>(null);
 const id=useId();
 useEffect(()=>{const update=()=>setNow(new Date());update();const timer=setInterval(update,60000);return()=>clearInterval(timer);},[]);
 const hour=now?hourInCentral(now):21;
 const night=hour<6.5||hour>=19.5;
 const colors=paletteAt(hour);
 return <figure className="sky" aria-hidden="true"><div className={`sky__frame${night?" sky__frame--night":""}`}>
        <svg className="sky__art" viewBox="220 0 1160 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor={colors.high}/><stop offset="1" stopColor={colors.horizon}/></linearGradient>
            <radialGradient id={`${id}-glow`}><stop stopColor={colors.light} stopOpacity=".18"/><stop offset="1" stopColor={colors.light} stopOpacity="0"/></radialGradient>
            <linearGradient id={`${id}-mist`} x2="0" y2="1"><stop stopColor={colors.horizon} stopOpacity="0"/><stop offset=".5" stopColor={colors.horizon} stopOpacity=".22"/><stop offset="1" stopColor={colors.horizon} stopOpacity="0"/></linearGradient>
            <g id={`${id}-tree`}>
              <g fill="none" stroke={colors.ground} strokeLinecap="round">
                <path d="M116 330Q100 231 127 145L144 93" strokeWidth="13"/>
                <path d="M115 265Q73 224 34 189M114 233Q179 206 217 157M126 168Q92 141 68 122M128 169Q176 126 176 91" strokeWidth="6"/>
                <path d="M77 230L64 182M169 210L177 174M142 112L125 82" strokeWidth="3"/>
              </g>
              <g fill={colors.blossom}>
                <ellipse cx="116" cy="90" rx="53" ry="20" opacity=".69"/><ellipse cx="165" cy="80" rx="46" ry="22" opacity=".76"/>
                <ellipse cx="72" cy="123" rx="57" ry="24" opacity=".8"/><ellipse cx="154" cy="117" rx="80" ry="28" opacity=".65"/>
                <ellipse cx="204" cy="149" rx="60" ry="23" opacity=".84"/><ellipse cx="58" cy="165" rx="53" ry="23" opacity=".75"/>
                <ellipse cx="119" cy="158" rx="65" ry="24" opacity=".72"/><ellipse cx="33" cy="184" rx="39" ry="15" opacity=".79"/>
              </g>
              <g fill={colors.light} opacity=".22"><ellipse cx="143" cy="72" rx="27" ry="7"/><ellipse cx="62" cy="111" rx="23" ry="6"/><ellipse cx="213" cy="137" rx="25" ry="6"/></g>
            </g>
          </defs>
          <path fill={`url(#${id}-sky)`} d="M0 0h1600v1000H0z"/>
          <circle cx="1190" cy="215" r="190" fill={`url(#${id}-glow)`}/>
          <circle cx="1190" cy="215" r={night ? 26 : 36} fill={colors.light} opacity=".86"/>
          {night && <g className="sky__stars" fill={colors.light}>{stars.map((star,i) => <circle key={i} cx={star.x} cy={star.y} r={star.radius} style={{ animationDelay: `${-i * 3}s` }}/>)}</g>}
          {night && <path className="sky__comet" d="M470 185l-31 13" fill="none" stroke={colors.light} strokeWidth="1" strokeLinecap="round" opacity=".35"/>}
          {!night && <g transform="translate(610 315)" opacity=".56">
            <g className="sky__creature" fill={colors.light}>
              <path d="M-43 0Q-24-12 1-6Q19-15 34-5Q43-2 48 4Q30 10 14 7Q-11 14-32 5L-44 14L-42 3L-47-8Z"/>
              <path d="M-9-4Q-16-26 9-29Q18-23 14-7Z" opacity=".7"/>
              <circle cx="27" cy="-1" r="1.2" fill={colors.ground}/>
            </g>
          </g>}
          <g transform="translate(800 258)" opacity={night ? ".76" : ".76"}>
            <g className="sky__ufo">
              {night && <path d="M-15 12L-37 105Q0 117 37 105L15 12Z" fill={colors.light} opacity=".045"/>}
              <path d="M-17 1Q0-19 17 1Z" fill={colors.middle} stroke={colors.light} strokeWidth="1.2"/>
              <ellipse cy="5" rx="34" ry="8" fill={colors.far} stroke={colors.light} strokeWidth="1.2"/>
              <path d="M-23 6Q0 17 23 6" fill="none" stroke={colors.light} strokeWidth="1" opacity=".55"/>
              {night && <g fill={colors.light} opacity=".75"><circle cx="-17" cy="9" r="1.3"/><circle cx="0" cy="12" r="1.3"/><circle cx="17" cy="9" r="1.3"/></g>}
            </g>
          </g>
          <g transform="translate(1160 322) scale(.38)" opacity=".35"><g className="sky__ufo sky__ufo--far"><path d="M-17 1Q0-19 17 1Z" fill={colors.middle} stroke={colors.light} strokeWidth="1.2"/><ellipse cy="5" rx="34" ry="8" fill={colors.far} stroke={colors.light} strokeWidth="1.2"/></g></g>
          <g className="sky__cloud" fill="none" stroke={colors.light} strokeWidth="1" opacity=".12"><path d="M940 300Q1110 281 1300 297M80 245Q230 229 385 242"/></g>
          <path d="M0 490Q95 453 182 474T347 432Q439 367 512 414T699 390Q790 322 875 388T1044 398Q1146 342 1250 412T1435 376Q1526 355 1600 391V1000H0Z" fill={colors.far}/>
          <path d="M0 560Q112 466 225 523T410 495Q510 450 629 539T832 501Q943 427 1042 498T1214 483Q1329 420 1450 493T1600 462V1000H0Z" fill={colors.middle}/>
          <path d="M0 492H1600V690H0Z" fill={`url(#${id}-mist)`} className="sky__mist"/>
          <path d="M0 635Q118 575 255 640T510 594Q658 546 784 625T1040 590Q1188 541 1307 603T1600 566V1000H0Z" fill={colors.near}/>
          <use href={`#${id}-tree`} transform="translate(1090 415) scale(.55)" opacity=".58"/>
          <path d="M0 784Q172 651 367 751T741 748Q947 642 1145 714T1600 692V1000H0Z" fill={colors.ground}/>
          <use href={`#${id}-tree`} transform="translate(1300 370) scale(1.25)"/>
          <use href={`#${id}-tree`} transform="translate(-115 493) scale(1.35)" opacity=".85"/>
          <g fill="none" stroke={colors.blossom} strokeWidth="1" opacity=".13"><path d="M0 817Q178 702 335 765M1090 755Q1310 829 1600 731M49 914Q183 870 310 902M1150 913Q1360 850 1540 886"/></g>
          <g className="sky__birds" fill="none" stroke={colors.light} strokeWidth="1.6" strokeLinecap="round" opacity=".48">
            <path d="M0 0q7-6 14 0 7-6 14 0"/><path d="M-40 17q6-5 12 0 6-5 12 0"/><path d="M35 25q5-4 10 0 5-4 10 0"/>
          </g>
        </svg>
</div></figure>;
}
