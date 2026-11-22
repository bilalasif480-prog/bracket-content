// week-03 SHORT cut (T-20261122-06 revision, Bilal: "too long"). 12–15 s per reel:
// hook (0–2.5 s) → ONE proof UI beat → payoff (one-line hisaab card or the key line) → end card with closing CTA (~2.2 s).
// Reuses the long reels' scenes, re-timed with K.warp. Render: SHORT=day1 OUTNAME=day1-short node render.js short
const K = require('./kit');
const { C } = K;

const H = 2.5, P = 6.8; // hook ends, proof ends

function build(day, o = {}) {
  let hook, proof, pay, end, dur, mode, ai = false;
  const HELP = { day1: { en: "We'll *build* it | for you.", ar: 'نبنيه لك.' }, day2: { en: "We'll get you | *found.*", ar: 'نخليهم يلقونك.' }, day3: { en: "We'll *build* it | for you.", ar: 'نبنيه لك.' }, day4: { en: "We'll *set* *it* *up* | for you.", ar: 'نجهزه لك.' }, day5: { en: "We'll get you | *found.*", ar: 'نخليهم يلقونك.' }, day6: { en: "We'll *build* | your app.", ar: 'نبني لك تطبيقك.' }, day7: { en: "We'll *set* *it* *up* | for you.", ar: 'نجهزه لك.' } };
  const W = K.warp;
  if (day === 'day1') {
    const m = require('./hisaab');
    end = 12.4; dur = 14.95;
    hook = W(m.sHook, 0, 3.6, 0, H); proof = W(m.sSearch, 3.6, 8.4, H, P);
    pay = t => K.scene(t, P, end, K.calc1(t, P, { n: '01', lab: 'Lost orders a month × each order', labAr: 'طلبات ضايعة بالشهر × كل طلب', a: 4, b: 15, total: 60, per: 'a month', perAr: 'بالشهر',
      fix: 'The *fix:* a website | they can *find.*', fixAr: 'الحل: موقع يلقونه في قوقل.' }));
    mode = t => 'paper';
  } else if (day === 'day2') {
    const m = o.biz ? require('./day2-geo').make({ biz: o.biz }) : require('./day2-geo');
    end = 11.2; dur = 13.75;
    hook = W(require('./day2-geo').hookMain, 0, 3.6, 0, H); proof = W(m.sAnswer, 8.6, 13.6, H, P); pay = W(m.sFix, 19.0, 23.8, P, end);
    mode = t => 'paper';
  } else if (day === 'day3') {
    const m = require('./day3-rented');
    end = 10.6; dur = 13.15;
    hook = W(m.hookMain, 0, 3.8, 0, H); proof = W(m.sPlinth, 3.8, 9.0, H, P); pay = W(m.sKeep, 18.0, 22.0, P, end);
    mode = t => t < P ? 'dark' : 'paper';
  } else if (day === 'day4') {
    const m = require('./day4-night');
    end = 12.4; dur = 14.95; ai = true;
    hook = W(m.hookMain, 0, 3.6, 0, H); proof = W(m.sMorning, 8.4, 13.4, H, P);
    pay = t => K.scene(t, P, end, K.calc1(t, P, { n: '02', lab: 'Late messages a week × each booking', labAr: 'رسائل بعد الدوام بالأسبوع × كل حجز', a: 3, b: 20, total: 60, per: 'a week', perAr: 'بالأسبوع',
      fix: 'The *fix:* an AI agent | that replies at *night.*', fixAr: 'الحل: وكيل ذكاء اصطناعي يرد بالليل.' }));
    mode = t => t < H ? 'night' : 'paper';
  } else if (day === 'day5') {
    const m = require('./day5-seo');
    end = 12.4; dur = 14.95;
    hook = W(m.hookMain, 0, 3.6, 0, H); proof = W(m.sPage3, 8.4, 13.2, H, P);
    pay = t => K.scene(t, P, end, K.calc1(t, P, { n: '03', lab: 'Extra customers a week × each visit', labAr: 'زباين زيادة بالأسبوع × كل زيارة', a: 2, b: 15, total: 30, per: 'a week', perAr: 'بالأسبوع',
      fix: 'The *fix:* SEO basics, | so they *find* you.', fixAr: 'الحل: أساسيات SEO… عشان يلقونك.' }));
    mode = t => t >= H && t < P ? 'dark' : 'paper';
  } else if (day === 'day6') {
    const m = require('./day6-app');
    end = 12.4; dur = 14.95;
    hook = W(m.hookMain, 0, 3.6, 0, H); proof = W(m.sForget, 8.4, 13.2, H, P);
    pay = t => K.scene(t, P, end, K.calc1(t, P, { n: '04', lab: 'Skipped visits a month × each visit', labAr: 'زيارات فاتت بالشهر × كل زيارة', a: 10, b: 8, total: 80, per: 'a month', perAr: 'بالشهر',
      fix: 'The *fix:* a simple app | that *reminds* them.', fixAr: 'الحل: تطبيق بسيط يذكّرهم.' }));
    mode = t => t >= H && t < P ? 'dark' : 'paper';
  } else if (day === 'day7') {
    const m = require('./day7-missed');
    end = 12.4; dur = 14.95; ai = true;
    hook = W(m.hookMain, 0, 3.6, 0, H); proof = W(m.sNext, 8.4, 13.2, H, P);
    pay = t => K.scene(t, P, end, K.calc1(t, P, { n: '05', lab: 'Lost bookings a week × each visit', labAr: 'حجوزات ضايعة بالأسبوع × كل زيارة', a: 3, b: 25, total: 75, per: 'a week', perAr: 'بالأسبوع',
      fix: 'The *fix:* an AI agent | that *texts* them back.', fixAr: 'الحل: وكيل ذكاء اصطناعي يرد عليهم بالواتساب.' }));
    mode = t => t >= H && t < P ? 'dark' : 'paper';
  } else throw new Error('unknown day ' + day);
  return {
    dur, S: { hook: 0, proof: H, payoff: P, end },
    frame(t) {
      const md = t >= end ? 'dark' : mode(t);
      return K.bg(t, md) + hook(t) + proof(t) + pay(t) + K.endHelp(t, end, { ai, help: HELP[day] });
    },
  };
}

const key = process.env.SHORT;
module.exports = key ? build(key) : {};
module.exports.build = build;
