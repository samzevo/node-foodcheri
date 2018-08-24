# node-foodcheri

Une API pour Foodchéri

## Usage

```javascript
const Foodcheri = require('node-foodcheri')
const foodcheri = new Foodcheri({
    apiKey: ""
})
```

### Authentification

```javascript
foodcheri.login(email, password)
```

### Récupérer le profil de l'utilisateur

```javascript
foodcheri.getProfile()
```

### Récupérer la liste des commandes

```javascript
foodcheri.getOrders()
```

### Récupérer la dernière commande

```javascript
foodcheri.getLastOrder()
```

### Récupérer une commande par son hash

```javascript
foodcheri.getLastOrder(orderHash)
```

### Récupérer tous les créneaux de livraison

```javascript
foodcheri.getAllTimeslots({latitude, longitude})
```

### Récupérer les créneaux de livraison pour une date et une heure

```javascript
foodcheri.getTimeslots({latitude, longitude}, mealDate = moment().format(DATE_FORMAT).toString(), time = "12:00")
```

### Récupérer l'id de la zone de livraison

```javascript
foodcheri.getIdArea({latitude, longitude}, mealDate = moment().format(DATE_FORMAT).toString(), time = "12:00")
```

### Récupérer le menu pour un type de repas, un jour et une zone de livraison

```javascript
foodcheri.getMenu(meal = 'LUNCH'|'DINNER', mealDate = moment().format(DATE_FORMAT).toString(), idArea = '100')
```

### Récupérer la facture pour une commande

```javascript
foodcheri.getReceipt(orderHash)
```