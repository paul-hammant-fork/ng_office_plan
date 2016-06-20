Refer to http://paulhammant.com/2015/12/21/angular-and-svg-and-couchdb/ for a primer.

This Angular+SVG demo-app was originally written for CouchDB interop. This fork is an will be to show
the same Angular app working with **MongoDB** as a backend in the 'serverless' style, via **RESTHeart** and CORS.

Do the setup as described in [https://github.com/SoftInstigate/restheart-blog-example](https://github.com/SoftInstigate/restheart-blog-example). Go into the blog app in a brower - [http://localhost:8080](http://localhost:8080), and log in.

Setup the seatmap database:

```
curl -u admin:changeit -i -X PUT http://127.0.0.1:8080/data/seatmap -H "Content-Type: application/json"
curl -u admin:changeit -i -X PUT http://127.0.0.1:8080/data/seatmap/seats -H "Content-Type: application/json"
```

Launch the app on 8081:

```
python -m SimpleHTTPServer 8081
```

Go into a browser to see it running [http://localhost:8081](http://localhost:8081)

NOTE - this is still a work in progress.
