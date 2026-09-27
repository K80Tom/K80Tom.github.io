import {createRequire} from 'node:module'
import {mkdir,writeFile} from 'node:fs/promises'
const require=createRequire(import.meta.url)
const {chromium}=require('playwright')
const base=process.env.TEST_URL||'http://127.0.0.1:4173'
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})})
await mkdir('artifacts',{recursive:true})
const failures=[];const checks=[]
const pages=['/','/projects.html','/video-agent.html','/aura.html','/minicode.html','/shortdrama.html','/papers.html','/honors.html','/404.html']
function expect(condition,message){if(!condition)failures.push(message);else checks.push(message)}
try{
  for(const width of [1440,768,390]){
    const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1})
    const page=await context.newPage()
    page.on('pageerror',error=>failures.push(`JS error ${width}: ${error.message}`))
    for(const route of pages){
      const response=await page.goto(base+route,{waitUntil:'networkidle'})
      expect(response.status()===200,`${width} ${route}: loads`)
      expect(await page.locator('h1').count()===1,`${width} ${route}: one page title`)
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1)
      expect(!overflow,`${width} ${route}: no horizontal page overflow`)
      const missing=await page.locator('img').evaluateAll(images=>images.filter(img=>img.complete&&img.naturalWidth===0).map(img=>img.src))
      expect(!missing.length,`${width} ${route}: images load (${missing.join(',')})`)
      if(route==='/'||route==='/video-agent.html'||route==='/honors.html'||(route==='/papers.html'&&width===390)){
        for(const img of await page.locator('img').all()) await img.scrollIntoViewIfNeeded()
        await page.waitForFunction(()=>Array.from(document.images).every(img=>img.complete))
        await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
        await page.screenshot({path:`artifacts/${route==='/'?'home':route.slice(1,-5)}-${width}.png`,fullPage:true})
        if(route==='/')await page.screenshot({path:`artifacts/hero-${width}.png`})
      }
    }
    await page.goto(base+'/honors.html')
    await page.locator('.certificate').first().click()
    expect(await page.locator('dialog').isVisible(),`${width}: certificate opens`)
    await page.keyboard.press('Escape')
    expect(!await page.locator('dialog').isVisible(),`${width}: escape closes certificate`)
    await page.goto(base+'/shortdrama.html')
    await page.locator('.image-trigger').first().click()
    expect(await page.locator('dialog').isVisible(),`${width}: product image opens`)
    await page.getByRole('button',{name:'关闭图片预览'}).click()
    await page.goto(base+'/video-agent.html')
    await page.getByRole('button',{name:/04.*审核交付/}).click()
    expect(await page.locator('.scene-explanation').innerText()==='校验结果与完成证据，将输出交给审核流程。',`${width}: recording stage selector works`)
    await page.goto(base+'/minicode.html')
    await page.getByRole('button',{name:'重播示意'}).click()
    await page.waitForFunction(()=>document.querySelectorAll('.terminal-lines>div').length===7)
    expect(await page.locator('.terminal-lines .success').isVisible(),`${width}: terminal replay completes`)
    await page.goto(base+'/')
    if(width===390){
      await page.getByRole('button',{name:'打开导航'}).click()
      expect(await page.getByRole('navigation').isVisible(),'Mobile navigation opens')
      await page.getByRole('navigation').getByRole('link',{name:'研究',exact:true}).click()
      await page.waitForURL('**/papers.html')
      expect(await page.locator('h1').innerText()==='让模型更轻，让理解更深。','Mobile navigation reaches research')
    }
    await page.getByRole('button',{name:'切换浅色主题'}).click()
    expect(await page.locator('html').getAttribute('data-theme')==='light',`${width}: theme switch works`)
    await page.reload()
    expect(await page.locator('html').getAttribute('data-theme')==='light',`${width}: theme preference persists`)
    if(width===1440){await page.goto(base+'/');await page.screenshot({path:'artifacts/home-light.png',fullPage:true})}
    await context.close()
  }
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',javaScriptEnabled:false})
  const page=await context.newPage();await page.goto(base+'/')
  expect(await page.getByRole('heading',{name:/把智能体/}).isVisible(),'Page readable without JavaScript')
  await page.goto(base+'/papers.html')
  expect(await page.locator('table').count()>=2,'Research tables present without JavaScript')
  await context.close()
  const reduced=await browser.newContext({reducedMotion:'reduce'});const motionPage=await reduced.newPage();await motionPage.goto(base+'/')
  expect(await motionPage.locator('.core-chip').evaluate(el=>getComputedStyle(el).animationName)==='none','Reduced motion disables ambient animation')
  await reduced.close()
  const summary={base,checks:checks.length,failures};await writeFile('artifacts/browser-check.json',JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2))
}finally{await browser.close()}
if(failures.length)process.exit(1)
