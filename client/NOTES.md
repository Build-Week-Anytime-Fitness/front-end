## Tony





## Rhiannon

Question:  Who will deploy to Netlify?

Possible User Data Structure:

  { "id": "1", "personName": "Pete", "email": "petel@email.com", "isOverEighteen": true, "password": abc123, "isInstructor": false }

Possible Class Data Structure:

  { "id": "1", "className": "oldie but goodie", "classType": "jazzersize", "classDate": "Monday", "startTime": 9:00am, "duration": 1, "intensity": "high", "location": "anywhere", "numberOfStudents": 10, "maxClassSize": 10 }

## Chris

useEffect(() => {
    axiosWithAuth()
      .get("/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        console.log(products);
      })
      .catch((err) => console.log("product fetch failed: ", err));
  }, [products]);
  return (
    <div
      className="d-flex flex-row flex-wrap justify-content-center"
      style={{
        width: "100vw",
        backgroundColor: "black",
        padding: "5vh 1vw",
      }}
    >
      <ProductCards products={products} />
    </div>
  );
}