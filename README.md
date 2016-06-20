Refer to http://paulhammant.com/2015/12/21/angular-and-svg-and-couchdb/ for a primer.

This was originally written for CouchDB interop. This fork is an ongoing attempt to get
the same Angular app to interop with MongoDB via RESTHeart and CORS.

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
