![](https://badgen.net/badge/Editor.js/v2.0/blue)

# AvatarMedia Tool

Provides Blog avatar for the [Editor.js](https://editorjs.io).

## Installation

Get the package

```shell
yarn add @vibesfr/avatar-media
```

Include module at your application

```javascript
import AvatarMedia from "@vibesfr/avatar-media";
```

**It requires TailwindCSS to work properly !**

```html

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    blog: AvatarMedia,
  }

  ...
});
```

## Config Params

```json
config: {
    users: yourUsers,
    currentUser: yourCurrentUser,
},
```

## Tool's settings

1. Change the read time

2. Change the user

## Output data

| Field        | Type      | Description                 |
|--------------|-----------|-----------------------------|
| readTime     | `integer` | read time duration          |
| creationDate | `string`  | creation date formated      |
| user         | `object`  | user associated to the post |
| avatar       | `string`  | avatar url for the user     |

```json
{
  "type": "avatarMedia",
  "data": {
    "readTime": "25",
    "creationDate": "12 mai 2024",
    "user": {
      "id": 2,
      "name": "Jean Dupont"
    },
    "avatar": "https://api.dicebear.com/8.x/initials/svg?seed=Jean%20DUPONT"
  }
}
```
