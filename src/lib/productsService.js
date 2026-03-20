const API_BASE_URL = "https://api.fda.gov/drug/ndc.json";
const API_BASE_URL_1 = "https://api.fda.gov/drug/label.json";
// const API_BASE_URL = "https://dummyjson.com";


const fetchData = async (endpoint = "/", baseURL = API_BASE_URL) => {
  try {
    const res = await fetch(`${baseURL}${endpoint}`);
    const data = await res.json();

    return [data, null];
  } catch (err) {
    console.log(er);
    return [null, err];
  }
}

function generateReviews() {
  const names = ["John Doe", "Jane Smith", "Alex Lee", "Chris Wong"];

  return Array.from({ length: 3 }).map(() => ({
    rating: Math.floor(Math.random() * 5) + 1,
    comment: getRandomComment(),
    date: new Date().toISOString(),
    reviewerName: names[Math.floor(Math.random() * names.length)],
    reviewerEmail: "user@demo.com"
  }));
}

function getRandomComment() {
  const comments = [
    "Great product!",
    "Not bad",
    "Would not recommend",
    "Highly effective",
    "Waste of money"
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

function getMedicineImages() {
  const images = [
    `https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    `https://images.unsplash.com/photo-1562243061-204550d8a2c9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    `https://plus.unsplash.com/premium_photo-1671721438260-1adb3749253f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    `https://images.unsplash.com/photo-1522335579687-9c718c5184d7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    `https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    `https://images.unsplash.com/photo-1624362772755-4d5843e67047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  ];

  const rnd = Math.ceil(Math.random() * images.length - 1);

  return [images[rnd]]
}

function transformFDA(item, index = 1) {
  const name =
    item.brand_name ||
    item.generic_name ||
    "Unknown Product";

  const description =
    item.indications_and_usage?.[0] ||
    "No description available.";

  const brand =
    item.openfda?.manufacturer_name?.[0] || "Generic";

  return {
    id: item.product_ndc,
    title: name,
    description: description,
    category: "medicine",
    price: +(Math.random() * 20 + 5).toFixed(2),
    discountPercentage: +(Math.random() * 15).toFixed(2),
    rating: +(Math.random() * 5).toFixed(2),
    stock: Math.floor(Math.random() * 100) + 1,
    tags: [
      "medicine",
      ...(item.active_ingredient || []).slice(0, 2)
    ],
    brand: brand,
    sku: `MED-${item.id || index}`,
    weight: Math.floor(Math.random() * 5) + 1,
    dimensions: {
      width: +(Math.random() * 20).toFixed(2),
      height: +(Math.random() * 20).toFixed(2),
      depth: +(Math.random() * 20).toFixed(2)
    },
    warrantyInformation: "No warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: generateReviews(),
    returnPolicy: "No return policy",
    minimumOrderQuantity: Math.floor(Math.random() * 50) + 1,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: String(item.id || index),
      qrCode: "https://cdn.dummyjson.com/public/qr-code.png"
    },
    images: getMedicineImages(),
    thumbnail: getMedicineImages()[0]
  };
}

export const getCategories = async () => {
  // const [data] = await fetchData("");

  return [];
};

export const getRandomProducts = async (n = 4) => {
  const rnd = Math.ceil(Math.random() * 194);
  const [data] = await fetchData(`?limit=${n}&skip=${1}`);

  return data.results.map(transformFDA);
};

const buildQueryString = (params) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([k]) => k !== "q" && k !== "category")
  ).toString();

  return query ? `?${query}` : "";
}

export const fetchProducts = async (filters = {}) => {
  let endpoint = "";

  const { select, sortBy, order, ...newFilters } = filters;

  if (newFilters.q) {
    endpoint = `?search=openfda.brand_name:${newFilters.q}`;
  } else if (newFilters.category) {
    endpoint = `${encodeURIComponent(newFilters.category)}`;
  }

  const qs = buildQueryString(newFilters);

  if (newFilters.q) {
    const prefix = qs ? "&" : "?";
    endpoint += `${qs}${prefix}q=${encodeURIComponent(newFilters.q)}`;
  } else {
    endpoint += qs;
  }

  const [data, err] = await fetchData(endpoint);
  const [data1] = await fetchData(endpoint, API_BASE_URL_1);

  if (err) {
    throw new Error(`Failed to fetch products: ${err.message}`);
  }

  return data.results.map((item, index) => ({
    ...item,
    ...data1.results[index]
  })).map(transformFDA)
}

export const getProductById = async (id) => {
  const [data, err] = await fetchData(`?limit=1&search=openfda.product_ndc:${id}`, API_BASE_URL_1)
  const [data1] = await fetchData(`?limit=1&search=openfda.product_ndc:${id}`, API_BASE_URL_1)

  return [{ ...data1.results[0], ...data.results[0] }].map(transformFDA)[0]
}
