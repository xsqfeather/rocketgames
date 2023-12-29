# API Document

### END POST https://games-api.8kas.com/

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [API Document](#api-document)
    - [END POST https://games-api.8kas.com/](#end-post-httpsgames-api8kascom)
  - [Lobby](#lobby)
    - [HTTP](#http)
      - [POST /lobby/signUp](#post-lobbysignup)
        - [input params](#input-params)
        - [output response](#output-response)
      - [POST /lobby/signIn](#post-lobbysignin)
        - [input params](#input-params-1)
        - [output response](#output-response-1)
    - [Socket.IO](#socketio)
      - [/user/lobby/lobbyHandler/login](#userlobbylobbyhandlerlogin)
        - [input params](#input-params-2)
        - [output response](#output-response-2)
          - [code:200](#code200)
    - [Socket.IO](#socketio-1)
      - [/user/lobby/lobbyHandler/login](#userlobbylobbyhandlerlogin-1)
      - [input params](#input-params-3)
      - [output response](#output-response-3)
        - [code:200](#code200-1)
        - [code:620](#code620)
  - [Rocket API](#rocket-api)
    - [Socket.io](#socketio-2)
      - [/user/rocket/rocketHandler/bet](#userrocketrockethandlerbet)
        - [input params](#input-params-4)
        - [output params](#output-params)
        - [code:200](#code200-2)
        - [code:620](#code620-1)
        - [code:1500](#code1500)
        - [code:1400](#code1400)
      - [/user/rocket/rocketHandler/escape](#userrocketrockethandlerescape)
        - [input params](#input-params-5)
        - [output response](#output-response-4)
        - [code:620](#code620-2)
        - [code:620](#code620-3)
        - [code:1500](#code1500-1)
        - [code:1400](#code1400-1)
      - [/ind/rocket/table/status](#indrockettablestatus)
        - [output params](#output-params-1)
- [The Mines Game API document](#the-mines-game-api-document)
  - [/user/mines/minesHandler/joinGame](#userminesmineshandlerjoingame)
    - [input params](#input-params-6)
    - [output params](#output-params-2)
  - [/user/mines/minesHandler/bet](#userminesmineshandlerbet)
    - [input params](#input-params-7)
    - [output params](#output-params-3)
      - [200](#200)
  - [/user/mines/minesHandler/choseBox](#userminesmineshandlerchosebox)
    - [input params](#input-params-8)
    - [output params](#output-params-4)
      - [200](#200-1)
  - [/user/mines/minesHandler/cashOut](#userminesmineshandlercashout)
    - [input params](#input-params-9)
    - [output params](#output-params-5)
      - [200](#200-2)
  - [/user/mines/minesHandler/getTableStatus](#userminesmineshandlergettablestatus)
    - [input params](#input-params-10)
    - [output params](#output-params-6)
      - [200](#200-3)

<!-- /code_chunk_output -->

## Lobby

### HTTP

#### POST /lobby/signUp

Register to the lobby and get the session, which can be used as token for clients

##### input params

```typescript
{
    "firstName": "Jack",
    "email": "xsqfeather@gmail.com",
    "deviceOS": "0" //0:ios, 1, android
}
```

##### output response

```typescript
{
    "code": 200,
    "accountID": 20010001000,
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
}
```

#### POST /lobby/signIn

Login to the lobby and get the session, which can be used as token for clients

##### input params

```typescript
{ firstName: 'simon', email: 'xsqfeather@gmail.com' }
```

##### output response

```typescript
{
  accountID: 20010001000;
  code: 200;
  session: "tKHMc6NzjIna4nrWM5RgKFsxoiGtggXG2Vk5LBSS6hrwi7lnh73Qph7Zlql36ayw";
}
```

### Socket.IO

#### /user/lobby/lobbyHandler/login

##### input params

```typescript
{
    "seq": "1", // every request should increase the number
    "accountID": "20010001000",
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"//from http login
}
```

##### output response

###### code:200

```typescript
{
    "code": 200,
    "accountID": 20010001000,
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
}
```

### Socket.IO

#### /user/lobby/lobbyHandler/login

#### input params

```typescript
{
    "seq": "1", // every request should increase the number
    "accountID": "20010001000",
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
}
```

#### output response

##### code:200

```typescript
{
    "code": 200,
    "ticks": 39,
    "isBet": false,
    "maxSeats": "10000",
    "cashOutPoint": 1.2265164606766912,
    "tableId": "4LZbC7tL7sPSq2eVV0DnZ",
    "state": "GAMING",
    "message": "join game success"
}
```

##### code:620

```typescript
{
    "code": 620, //table not found
    "message": `Table ${tableId} not found`
}
```

## Rocket API

### Socket.io

#### /user/rocket/rocketHandler/bet

When rocket is ready, the player can put money into table to bet

##### input params

```typescript
{
    "game": "rocket",
    "accountID": "20010001000",
    "session": "A7Boz5U63KVrCcVeQcecy5QKJXAqTQ0Q5FT5qu4bvOgXyV6CXeUJpyaZlqq95kzd",
    "amount": 10
}
```

##### output params

##### code:200

```typescript
{
    "code": 200,
    "ticks": 10,
    "isBet": true,
    "maxSeats": "10000",
    "cashOutPoint": 2.5578779922522403,
    "tableId": "4LZbC7tL7sPSq2eVV0DnZ",
    "state": "READY"
}
```

##### code:620

GameClassError

```typescript
{
    "code": 620, //table not found
    "message": `Table ${tableId} not found`//`User ${accountID} not found`
}
```

##### code:1500

The game action is not at the right time

```typescript
{
    "code": 1500,
    "message": "table not ready",
    "gameCode": "table:errors:not-ready",
}
```

##### code:1400

The game action is not at the right time

```typescript
{
    "code": 1400,
    "message": "player not found on the table",
    "gameCode": "table:errors:player-not-found",
}
```

#### /user/rocket/rocketHandler/escape

When rocket is flying, the player can get back his bet money with point

##### input params

```typescript
{
    "game": "rocket",
    "accountID": "20010001000",
    "session": "A7Boz5U63KVrCcVeQcecy5QKJXAqTQ0Q5FT5qu4bvOgXyV6CXeUJpyaZlqq95kzd",
}
```

##### output response

##### code:620

```typescript
{
    "code": 200,
    "ticks": 12,
    "isBet": false,
    "maxSeats": "10000",
    "cashOutPoint": 1.0716269476405165,
    "tableId": "4LZbC7tL7sPSq2eVV0DnZ",
    "state": "GAMING",
    "result": {
        "point": "1.07",
        "profit": "0.72",
        "winMoney": "10.72",
        "betMoney": "10.00"
    }// this is the game result for this round
}
```

##### code:620

GameClassError

```typescript
{
    "code": 620, //table not found
    "message": `Table ${tableId} not found`//`User ${accountID} not found`
}
```

##### code:1500

The game action is not at the right time

```typescript
{
    "code": 1500,
    "message": "table not ready",
    "gameCode": "table:errors:not-ready",
}
```

##### code:1400

The game action is not at the right time

```typescript
{
    "code": 1400,
    "message": "player not found on the table",
    "gameCode": "table:errors:player-not-found",
}
```

#### /ind/rocket/table/status

The server send the table status to the clients

##### output params

```typescript
{
    "code": 200,
    "ticks": 1,
    "isBet": false,
    "maxSeats": "10000",
    "cashOutPoint": 1.5436936295863515,
    "tableId": "4LZbC7tL7sPSq2eVV0DnZ",
    "state": "READY"
}
```

# The Mines Game API document

All apis are all on Socket.IO

## /user/mines/minesHandler/joinGame

Join the mines game only after login to the Lobby.

### input params

```typescript
{
    seq: "1",
    game: "mines",
    accountID: "20010001000",
    session: "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
}
```

### output params

```typescript
{
  RT: 0.97;
  beMone: 0;
  cashOutoun: 0;
  cod: 20;
  curentBetAmoun: 0;
  excludeMinesNu: 0;
  id: "U9IfQkvghULvdXKP1QeQx";
  level: 1;
  maxSeats: 100;
  maximumBet: 10000;
  maximumPayment: 10000;
  minnumBet: 1;
  players: [];
  prefix: "mine:172.20.10.3";
  stat: "CHIPIN";
  taxMoneyPercent: 0.05;
}
```

## /user/mines/minesHandler/bet

### input params

```typescript
{
	seq: 2,
	accountID,
	session,
	game: 'mines',
	bet: 100,
	level: 5
}
```

### output params

#### 200

```typescript
{
  accountID: 20010001000;
  bet: 100;
  code: 200;
  game: "mines";
  level: 5;
  message: alradyBet: true;
  tableState: "GAMING";
  seq: 2;
  session: "21auq7yhVM2owTnzSiUsus7Y3SSSdXvHC4Opaa417szw7CTIVqEQrNyZlqoxq1cm";
}
```

## /user/mines/minesHandler/choseBox

### input params

```typescript
{
    game: "mines",
    accountID: "20010001000",
    session: "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351",
	select: 9
}
```

### output params

#### 200

```typescript
{
  accountID: 20010001000;
  code: 200;
  game: "mines";
  message: currentSelect: 9;
  hit: 2;
  mineInfo: (25)[
    (3, 1, 3, 3, 3, 3, 3, 3, 4, 2, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 4)
  ];
  nextbei: "1.96";
  nowbei: "1.53";
  odd: 153;
  result: {
    betMoney: 100;
    level: 5;
    mineInfo: (25)[
      (3,
      1,
      3,
      3,
      3,
      3,
      3,
      3,
      4,
      2,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      4,
      3,
      3,
      3,
      4,
      3,
      3,
      4)
    ];
    rate: 0;
    winScore: 0;
  }
  select: 9;
  seq: 2;
  session: "21auq7yhVM2owTnzSiUsus7Y3SSSdXvHC4Opaa417szw7CTIVqEQrNyZlqoxq1cm";
}
```

## /user/mines/minesHandler/cashOut

### input params

```typescript
{
    game: "mines",
    accountID: "20010001000",
    session: "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
}
```

### output params

#### 200

```typescript
{
  accountID: 20010001000;
  code: 200;
  game: "mines";
  message: betMoney: 100;
  level: 5;
  mineInfo: (25)[
    (0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
  ];
  rate: "1.21";
  winScore: 121;
  seq: 2;
  session: "21auq7yhVM2owTnzSiUsus7Y3SSSdXvHC4Opaa417szw7CTIVqEQrNyZlqoxq1cm";
}
```

## /user/mines/minesHandler/getTableStatus

### input params

```typescript
{
    game: "mines",
    accountID: "20010001000",
    session: "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
}
```

### output params

#### 200

```typescript
{
	accountID: 20010001000
	code: 200
	game: "mines"
	message: game: "mines"
	level: 1
	maximumBet: 10000
	maximumPayment: 10000
	minnumBet: 1
	tableId: "9hFnWdARriQzd2LwWy2Oa"
	tableState: "CHIPIN"
	seq: 2
	session: "21auq7yhVM2owTnzSiUsus7Y3SSSdXvHC4Opaa417szw7CTIVqEQrNyZlqoxq1cm"
	gameRecord:[
		betMoney: 100
		level: 5
		mineInfo: [3, 1, 3, 3, 3, 3, 3, 3, 4, 2, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 4]
		rate: 0
		winScore: 0
	]
}
```
