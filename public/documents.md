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
        - [output params](#output-params)
        - [output response](#output-response-2)
    - [Socket.IO](#socketio-1)
      - [/user/lobby/lobbyHandler/login](#userlobbylobbyhandlerlogin-1)
        - [input params](#input-params-3)
        - [output params](#output-params-1)
  - [Rocket API](#rocket-api)
    - [Socket.io](#socketio-2)
      - [/user/rocket/rocketHandler/bet](#userrocketrockethandlerbet)
        - [input params](#input-params-4)
        - [output params](#output-params-2)
      - [/user/rocket/rocketHandler/escape](#userrocketrockethandlerescape)
        - [input params](#input-params-5)
        - [output params](#output-params-3)
      - [/ind/rocket/table/status](#indrockettablestatus)
        - [output params](#output-params-4)

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

##### output params

```typescript
{
    "seq": "1",
    "accountID": "20010001000",
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351",
    "gameNode": "lobby:172.20.10.3",
    "code": 200,
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

### Socket.IO

#### /user/lobby/lobbyHandler/login

##### input params

```typescript
{
    "seq": "1", // every request should increase the number
    "accountID": "20010001000",
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
}
```

##### output params

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

##### output params

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
