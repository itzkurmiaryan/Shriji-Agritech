document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const productKey = params.get("product");

  const title = document.querySelector(".product-info h1");
  const price = document.querySelector(".price");
  const description = document.querySelector(".description");
  const image = document.querySelector(".product-image img");
  const featuresContainer = document.querySelector(".features");
  const specGrid = document.getElementById("specGrid");

  // ===============================
  // COMPLETE PRODUCT DATABASE
  // ===============================


  const products = {

  
    mulch: {
      name: "Mulch Paper",
      price: "Make Enquiry for Latest Price",
      description: "Prevents weed growth and maintains soil moisture.",
      image: "images/mulch.jpg",
      features: [
        "Weed Control",
        "Improves Yield",
        "Maintains Soil Moisture",
        "Easy to Install"
      ],
      specifications: {
        Material: "Plastic Film",
        Usage: "Vegetable & Fruit Farming",
        Warranty: "6 Months",
        Thickness: "25–30 Micron"
      }
    },

    drip: {
      name: "Drip Irrigation System",
      price: "Make Enquiry for Latest Price",
      description: "Advanced drip irrigation system designed for maximum water efficiency and higher crop productivity.",
      image: "images/drip.jpg",
      features: [
        "Water Saving Technology",
        "Easy Installation",
        "Long Lasting Material",
        "Suitable for Vegetables & Fruits"
      ],
      specifications: {
        Material: "UV Protected Polyethylene",
        Usage: "Agriculture & Farming",
        Warranty: "1 Year Warranty",
        WaterSaving: "Up to 60% Water Saving"
      }
    },

    hdpe: {
      name: "HDPE Lapeta Pipe 4\"",
      price: "Make Enquiry for Latest Price",
      description: "Heavy duty HDPE lapeta pipe ideal for irrigation systems.",
      image: "images/hdpe.jpeg",
      features: [
        "High Strength",
        "Flexible & Durable",
        "Heavy Pressure Resistance",
        "Long Life"
      ],
      specifications: {
        Material: "High Density Polyethylene",
        Usage: "Irrigation Systems",
        Warranty: "2 Years Warranty",
        Size: "4 inch Diameter"
      }
    },


    cropcover: {
      name: "Plant Crop Cover",
      price: "Make Enquiry for Latest Price",
      description: "Protects crops from insects, frost and extreme sunlight.",
      image: "images/cropcover.jpg",
      features: [
        "Insect Protection",
        "Frost Resistant",
        "UV Resistant",
        "Reusable & Breathable"
      ],
      specifications: {
        Material: "Polyethylene",
        Usage: "Crop Protection",
        Warranty: "1 Year Warranty",
        Thickness: "150–200 Micron"
      }
    },

    chicken: {
      name: "Chicken Manure",
      price: "Make Enquiry for Latest Price",
      description: "Organic manure rich in nitrogen and nutrients.",
      image: "images/chicken.jpeg",
      features: [
        "100% Organic",
        "Improves Soil Fertility",
        "Eco Friendly",
        "Boosts Crop Growth"
      ],
      specifications: {
        Type: "Organic Fertilizer",
        Usage: "Soil Fertility Improvement",
        Warranty: "No Warranty (Natural Product)",
        Nutrients: "High Nitrogen Content"
      }
    },

    cropsupportnet: {
      name: "Crop Support Net",
      price: "Make Enquiry for Latest Price",
      description: "Strong agricultural support net for creeper crops like tomato and cucumber.",
      image: "images/cropsupport.jpg",
      features: [
        "Strong Nylon Material",
        "Supports Creeper Crops",
        "Improves Air Circulation",
        "Reusable & Durable"
      ],
      specifications: {
        Material: "High Strength Nylon",
        Usage: "Support for Vegetable Crops",
        Warranty: "1 Year Warranty",
        RollSize: "Standard 100 Meter Roll"
      }
    },

    plantclip: {
      name: "Plant Support Clip",
      price: "Make Enquiry for Latest Price",
      description: "Plastic clip used to support plant stems and vines.",
      image: "images/plant.jpeg",
      features: [
        "Reusable Plastic",
        "Strong Grip",
        "Easy to Use",
        "Weather Resistant"
      ],
      specifications: {
        Material: "Durable Plastic",
        Usage: "Plant Stem Support",
        Warranty: "No Warranty",
        Size: "Standard Size"
      }
    },

    hdpelapeta: {
      name: "HDPE Lapeta Pipe 4\"",
      price: "Make Enquiry for Latest Price",
      description: "Heavy duty HDPE lapeta pipe ideal for irrigation systems.",
      image: "images/hdpe.jpeg",
      features: [
        "High Strength",
        "Flexible & Durable",
        "Heavy Pressure Resistance",
        "Long Life"
      ],
      specifications: {
        Material: "High Density Polyethylene",
        Usage: "Irrigation Systems",
        Warranty: "2 Years Warranty",
        Size: "4 inch Diameter"
      }
    },

    ldlapeta: {
      name: "LD Lapeta Pipe",
      price: "Make Enquiry for Latest Price",
      description: "Light density lapeta pipe for flexible irrigation setups.",
      image: "images/ldlapeta.jpeg",
      features: [
        "Cost Effective",
        "Light Weight",
        "Flexible",
        "Easy Installation"
      ],
      specifications: {
        Material: "Low Density Polyethylene",
        Usage: "Flexible Irrigation",
        Warranty: "1 Year Warranty",
        Size: "Various Sizes Available"
      }
    },

    minisprinkler: {
      name: "Mini Sprinkler System",
      price: "Make Enquiry for Latest Price",
      description: "Uniform water distribution system for field crops.",
      image: "images/mini.jpeg",
      features: [
        "Uniform Water Spread",
        "Energy Efficient",
        "Easy Installation",
        "Ideal for Large Farms"
      ],
      specifications: {
        Material: "High Quality Plastic",
        Usage: "Sprinkler Irrigation",
        Warranty: "1 Year Warranty",
        Coverage: "Up to 1 Hectare"
      }
    },

    weedmat: {
      name: "Weed Mat",
      price: "Make Enquiry for Latest Price",
      description: "Blocks sunlight and prevents unwanted weed growth.",
      image: "images/weed.jpeg",
      features: [
        "Weed Control",
        "UV Resistant",
        "Maintains Soil Moisture",
        "Durable Fabric"
      ],
      specifications: {
        Material: "Heavy Duty Fabric",
        Usage: "Weed Control Matting",
        Warranty: "2 Years Warranty",
        Size: "Multiple Sizes"
      }
    },

    tirpal: {
      name: "Agricultural Tirpal",
      price: "Make Enquiry for Latest Price",
      description: "Waterproof sheet for crop covering and storage protection.",
      image: "images/tirpal.jpeg",
      features: [
        "Waterproof",
        "UV Resistant",
        "Heavy Duty",
        "Multi Purpose"
      ],
      specifications: {
        Material: "Waterproof Fabric",
        Usage: "Crop & Storage Protection",
        Warranty: "2 Years Warranty",
        Size: "Various Sizes Available"
      }
    }

  };

  // ===============================
  // LOAD PRODUCT
  // ===============================

  if (products[productKey]) {

    const product = products[productKey];

    title.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;
    image.src = product.image;
    image.alt = product.name;

    if (featuresContainer) {
      featuresContainer.innerHTML = "";
      product.features.forEach(feature => {
        const div = document.createElement("div");
        div.innerHTML = `<i class="fas fa-check-circle"></i> ${feature}`;
        featuresContainer.appendChild(div);
      });
    }

    if (specGrid) {
      specGrid.innerHTML = "";
      for (let key in product.specifications) {
        const specBox = document.createElement("div");
        specBox.classList.add("spec-box");
        specBox.innerHTML = `
          <h4>${key}</h4>
          <p>${product.specifications[key]}</p>
        `;
        specGrid.appendChild(specBox);
      }
    }

  } else {

    title.textContent = "Product Not Found";
    price.textContent = "";
    description.textContent = "Sorry, the product you are looking for does not exist.";
    if (image) image.style.display = "none";
    if (featuresContainer) featuresContainer.innerHTML = "";
    if (specGrid) specGrid.innerHTML = "";

  }

});