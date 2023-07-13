/* 変数 */
let ran;
let set = 0;
let pos = 0;
let typ_num = 0;
let hp = 5;
let dmg = 0;
let mns = 0;
let lft_time = 10;
let time = lft_time;
let flag1 = false;
let flag2 = false;
let scr = 0;
let cor_typ = 0;
let mis_typ = 0;

/* 問題 */
let qst = [
    ['川井', 'kawai'],
    ['大日方', 'obinata'],
    ['畑中', 'hatanaka']
];

/* 素材 */
let fontRegular;
let fontResult;

let top_bkg;
let logo;
let stick;
let plate;

let game_bkg;
let treant;
let poisonmushroom;
let deadtree;

let rslt_bkg;
let page;
let retry_btn;
let title_btn;


/* 読み込み */
function preload()
{
    logo = loadImage('./asset/logo.png');
    stick = loadImage('./asset/stick.png');
    top_bkg = loadImage('./asset/top_bkg.png');

    game_bkg = loadImage('./asset/game_bkg.png');
    treant = loadImage('./asset/treant.png');
    poisonmushroom = loadImage('./asset/poisonmushroom.png');
    deadtree = loadImage('./asset/deadtree.png');

    page = loadImage('./asset/page.png')
    rslt_bkg = loadImage('./asset/rslt_bkg.png');
}

/* 最初の一回 */
function setup()
{
    /* キャンバスを作成 */
    createCanvas(900, 600);
    ran = Math.floor(Math.random()*qst.length);

    /* フォントを読み込む */
    fontRegular = loadFont('./font/VeraMono.ttf');
    fontResult = loadFont('./font/Hangyaku-Rp6ye.ttf');

    /* フォントを変更 */
    textFont(fontResult);

    /* スタートボタン */
    plate = new Sprite();
    plate.img = './asset/plate.png';
    plate.scale = 0.16;
    plate.x = 240;
    plate.y = 325;
    plate.h = 80;
    plate.w = 200;
    plate.rotation = 355;
    plate.collider = 'static';
    plate.visible = false;

    /* リトライボタン */
    retry_btn = new Sprite();
    retry_btn.text = 'リトライ';
    retry_btn.textSize = 70;
    retry_btn.color = color(255, 255, 255, 0);
    retry_btn.stroke = color(255, 255, 255, 0);
    retry_btn.x = 670;
    retry_btn.y = 410;
    retry_btn.rotation = -13;
    retry_btn.collider = 'static';
    retry_btn.visible = false;


    /* タイトルボタン */
    title_btn = new Sprite();
    title_btn.text = 'タイトルへ';
    title_btn.textSize = 70;
    title_btn.color = color(255, 255, 255, 0);
    title_btn.stroke = color(255, 255, 255, 0);
    title_btn.x = 690;
    title_btn.y = 510;
    title_btn.rotation = -13;
    title_btn.collider = 'static';
    title_btn.visible = false;
}

// フレーム毎
function draw()
{
    /* 背景を描画 */
    background(220);

    /* マウスの位置 */
    // console.log(mouseX, mouseY);
    
    /* トップ画面 */
    if(set == 0)
    {
        /* 背景の描画 */
        imageMode(CORNER);
        image(top_bkg, 0, -100, 900, 700);

        /* タイトルの描画 */
        imageMode(CENTER);
        image(logo, 460, 230, 1250, 1000);

        /* 棒の描画 */
        image(stick, 180, 400, 400, 280);

        /* 板の描画 */
        plate.visible = true;
        if(plate.mouse.presses())
        {
            set = 1;
            plate.visible = false;
        }
        
        // plate.debug = mouse.pressing();
    }

    /* ゲーム画面 */
    else if(set == 1)
    {
        /* 背景の描画 */
        imageMode(CORNER);
        image(game_bkg, 0, -100, 900, 700);

        /* 文字の囲いを描画 */
        fill(0, 0, 0, 200);
        rectMode(CENTER);
        rect(450, 500, 400, 150)

        fill(0, 0, 0, 0);
        stroke(255);
        strokeWeight(4);
        rect(450, 500, 400, 150);
        noStroke();


        /* リザルトへ */
        if(time < -2)
        {
            set = 2;
            time = 3;
            flag2 = false;
        }
        /* 時間切れ */
        else if(time < 0)
        {
            textFont('Arial');
            fill(255);
            textSize(50);
            textAlign(CENTER, CENTER);
            text('終了!!', 450, 500);
            flag1 = false;
        }
        /* ゲーム中 */
        else if(time <= lft_time && flag1)
        {
            /* 日本語を描画 */
            fill(255);
            textFont('Arial');
            textSize(50);
            textAlign(CENTER, CENTER);
            text(qst[ran][0], 450, 480);

            /* ローマ字を描画*/
            textFont(fontRegular);
            for(let i = 0; i < qst[ran][1].length; i++)
            {
                if(0 < pos && i < pos)
                {
                    fill(0);
                }
                else
                {
                    fill(255);
                }
                textSize(30);
                textAlign(CENTER, CENTER);
                text(qst[ran][1][i], 450 - qst[ran][1].length * 8 + i * 20, 530);
            }
        }
        /* ゲーム前 */
        else
        {
            textFont('Arial');
            fill(255);
            textSize(40);
            textAlign(CENTER, CENTER);
            text('Spaceキーを\n押してください', 450, 500);
            if(key == ' ')
            {
                flag1 = true;
                flag2 = true;
            }
        }

        /* HPを描画 */
        rectMode(CORNER);
        fill(255, 0, 0);
        rect(350, 390, 200, 20);

        fill(0, 255, 0);
        rect(350, 390, 40 * (5 - dmg), 20);


        /* モンスターを描画 */
        if(mns % 3 == 0)
        {
            imageMode(CENTER);
            image(treant, 450, 230, 300, 300);
        }
        else if(mns % 3 == 1)
        {
            imageMode(CENTER);
            image(poisonmushroom, 450, 230, 300, 300);
        }
        else if(mns % 3 == 2)
        {
            imageMode(CENTER);
            image(deadtree, 450, 230, 300, 300);
        }

        /* 時間経過 */
        if(frameCount % 60 == 0 && frameCount > 0 && flag2)
        {
            time--;
            console.log(time);
        }
    }

    /* リザルト画面 */
    else if(set == 2)
    {
        /* 背景の描画 */
        imageMode(CORNER);
        image(rslt_bkg, 0, -100, 900, 700)

        /* 文字の描画 */
        fill(0)
        textFont(fontResult);
        if(time < 3)
        {
            rotate(3);

            textSize(70);
            textAlign(CENTER, CENTER);
            text('~Result~', 220, 50);

            textSize(70);
            textAlign(CORNER, CORNER);
            text('Score：  ', 100, 200);

            textSize(100);
            textAlign(CENTER, CENTER);
            text(scr + '点', 220, 300);

            rotate(-3);
        }
        if(time < 2)
        {
            rotate(7);
            
            textSize(50);
            textAlign(CORNER, CORNER);
            text('正打数：  ' + cor_typ + ' 回', 500, 20);
            text('誤打数：  ' + mis_typ + ' 回', 500, 90);
            text('正答率；  ' + parseInt(cor_typ / (cor_typ + mis_typ) * 100, 10) + ' ％', 500, 160);
            
            rotate(-7);
        }
        if(time < 1)
        {
            retry_btn.visible = true;
            title_btn.visible = true;
        }

        /* 時間経過 */
        if(frameCount % 60 == 0 && frameCount > 0 && time > 0)
        {
            time--;
            console.log(time);
        }

        /* リトライ */
        if(retry_btn.mouse.presses())
        {
            set = 1;
            initialize();
            retry_btn.visible = false;
            title_btn.visible = false;
        }

        /* タイトル */
        if(title_btn.mouse.presses())
        {
            set = 0;
            initialize();
            retry_btn.visible = false;
            title_btn.visible = false;
        }
    }
}

/* キーが押されたら */
function keyTyped()
{
    typ_num++;
    if(key == qst[ran][1].slice(pos, pos+1) && flag1)
    {
        cor_typ++;
        console.log('正解:' + key);
        pos++;
        if(pos == qst[ran][1].length)
        {
            console.log('クリア！');
            dmg++;
            scr += 100;

            /* モンスターが倒れたら */
            if(dmg == 5)
            {
                mns++;
                dmg = 0;
                scr += 300;
            }
            ran = Math.floor(Math.random()*qst.length);
            pos = 0;
        }
    }
    else
    {
        mis_typ++;
    }
}

/* 初期化 */
function initialize()
{
    pos = 0;
    typ_num = 0;
    hp = 5;
    dmg = 0;
    mns = 0;
    time = lft_time;
    flag1 = false;
    flag2 = false;
    scr = 0;
    cor_typ = 0;
    mis_typ = 0;

    if(set == 0)
    {
        plate.visible = true;
    }
}