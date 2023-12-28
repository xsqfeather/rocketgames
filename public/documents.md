# API Document

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [API Document](#api-document)
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
  - [Lobby](#lobby-1)
    - [HTTP](#http-1)
      - [POST /lobby/signUp](#post-lobbysignup-1)
        - [input params](#input-params-3)
        - [output response](#output-response-2)
      - [POST /lobby/signIn](#post-lobbysignin-1)
        - [input params](#input-params-4)
        - [output response](#output-response-3)
    - [Socket.IO](#socketio-1)
      - [/user/lobby/lobbyHandler/login](#userlobbylobbyhandlerlogin-1)
        - [input params](#input-params-5)
        - [output params](#output-params-1)

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
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
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
    "user": {
        "ip": "",
        "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351",
        "queue": "",
        "game": "",
        "tableId": "",
        "offline": false,
        "offlineTicks": 0,
        "return": false,
        "accountID": 20010001000,
        "firstName": "Jack",
        "gender": "FEMALE",
        "deviceOS": "ANDROID",
        "email": null,
        "country": null,
        "vipLevel": 0,
        "id": "6589a5ccb4dfd8dcb0fe3c45",
        "socketId": "FrKraD0lEH-L6Rs5AAAH",
        "lobbyNode": "",
        "gameNode": "",
        "comeBack": false,
        "socialID": null,
        "lastName": null,
        "bio": null,
        "createdAt": "2023-12-25T15:54:52.422Z",
        "updatedAt": "2023-12-25T15:54:52.422Z",
        "gameChips": 0,
        "goldCoin": 0,
        "expPoint": 0,
        "vipPoint": 0
    }
}
```

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
    "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351"
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
    "user": {
        "ip": "",
        "session": "xKLxeQLJG0Ri280q2GRTGjB9yqaTi9Tmb8EjSgCaRjJGc7MngDgjc31Zlql3n351",
        "queue": "",
        "game": "",
        "tableId": "",
        "offline": false,
        "offlineTicks": 0,
        "return": false,
        "accountID": 20010001000,
        "firstName": "Jack",
        "gender": "FEMALE",
        "deviceOS": "ANDROID",
        "email": null,
        "country": null,
        "vipLevel": 0,
        "id": "6589a5ccb4dfd8dcb0fe3c45",
        "socketId": "FrKraD0lEH-L6Rs5AAAH",
        "lobbyNode": "",
        "gameNode": "",
        "comeBack": false,
        "socialID": null,
        "lastName": null,
        "bio": null,
        "createdAt": "2023-12-25T15:54:52.422Z",
        "updatedAt": "2023-12-25T15:54:52.422Z",
        "gameChips": 0,
        "goldCoin": 0,
        "expPoint": 0,
        "vipPoint": 0
    }
}
```
