This is my submission for the 2019 Shopify Developer intern challenge. It is written using Node.js and Express.js. There are 5 possible actions a user can execute. To test the various requests, I used the program postman and the port localhost:3000.

First, a user can add a product to the store. To add a product I used a POST request to the following:


	POST localhost:3000/products


followed by a json object with the following format:

	{
		"title": "my_title",
		"price": "my_price",
		"inventory_count": "my_count"

	}

The next possible request is to query products, users can query a specific product:


	GET localhost:3000/products/product_name


Or, users can query for all products, like so:


	GET localhost:3000/products/all


Additionally, if a user wants to query for all products that are currently in stock they can do the following:


	GET localhost:3000/products/all/true


Finally, users can purchase a item:


	DELETE localhost:3000/products/product_name

