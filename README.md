# ShopMart
<p>
An online shopping application built using Angular. It features user-authentication using Firebsae Google Auth Provider. Protected links that are only visible to admin and some requires uers to be logged in.

Current features and visibility:

Home,<br>
Shopping Cart - Login reguired,<br>
Products,<br>
Manage Products - Login reguired (Soon to be changed to admin only),<br>
Manage Products -> Add Products - Login reguired (Soon to be changed to admin only)

Adding product using Template driven forms
Serverless Application built upon Firebase
Added Search, Update, Delete and Cancel operations for the product.

Modified the products UI with additional features of pagination, sorting and search built using Angular Material
</p>

## Local Development

Setup you own firebase project then,

Add new folder named environments in src folder

Inside that folder add file named environments.ts with following contents

```
export const environment = {
    production: false,
    firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    }
};
```

Add file named environments.development.ts with following contents

```
export const environment = {
    production: true,
    firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    }
};
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Live Deployment

https://shopmart-698a1.web.app/

## Snap Shots

1. Home Page 

![Home](gitSnaps/Home.png "Home Page")

2. Admin Add New Product 

![Admin Add New Product ](gitSnaps/AdminAddProduct.png "Admin Add New Product ")

3. Admin Procducts 

![Admin Products](gitSnaps/AdminManageProducts.png "Admin Procducts Page")

4. Admin Procducts Filter and Sort

![Admin Products Filter and Sort](gitSnaps/AdminManageProductsFilterAndSort.png "Admin Procducts Page Filter and Sort")

5. Update Product 

![Update Product ](gitSnaps/UpdateProduct.png "Update Product ")