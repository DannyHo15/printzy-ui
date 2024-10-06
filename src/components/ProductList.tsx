import Image from "next/image";
import Link from "next/link";
// import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  let res = {
    items: [
      {
        name: "I'm a product",
        slug: "i-m-a-product-9",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        sku: "126351351935",
        weight: 0,
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: false,
          inStock: true,
          inventoryStatus: "IN_STOCK",
        },
        price: {
          currency: "VND",
          price: 45,
          discountedPrice: 45,
          formatted: {
            price: "45₫",
            discountedPrice: "45₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 45,
          discountedPrice: 45,
          formatted: {
            price: "45₫",
            discountedPrice: "45₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 45,
          discountedPrice: 45,
          formatted: {
            price: "45₫",
            discountedPrice: "45₫",
          },
        },
        priceRange: {
          minValue: 45,
          maxValue: 45,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Diffuser-Product.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg",
              width: 2000,
              height: 2000,
            },
            _id: "22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Diffuser-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg",
                width: 2000,
                height: 2000,
              },
              _id: "22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_fcd691909a3742938a8cfa05c1cd2b0a~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Diffuser-Context.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_fcd691909a3742938a8cfa05c1cd2b0a~mv2.jpg/v1/fit/w_2895,h_2895,q_90/file.jpg",
                width: 2895,
                height: 2895,
              },
              _id: "22e53e_fcd691909a3742938a8cfa05c1cd2b0a~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: false,
        productOptions: [],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-9",
        },
        numericId: "1418287987413000",
        inventoryItemId: "844c7585-8f48-630c-037f-a7bdfa96bb9a",
        discount: {
          type: "NONE",
          value: 0,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {},
            variant: {
              priceData: {
                currency: "VND",
                price: 45,
                discountedPrice: 45,
                formatted: {
                  price: "45₫",
                  discountedPrice: "45₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 45,
                discountedPrice: 45,
                formatted: {
                  price: "45₫",
                  discountedPrice: "45₫",
                },
              },
              weight: 0,
              sku: "126351351935",
              visible: true,
            },
            stock: {
              trackQuantity: false,
              inStock: true,
            },
            _id: "00000000-0000-0000-0000-000000000000",
          },
        ],
        lastUpdated: "2024-10-03T16:28:03.192Z",
        ribbon: "",
        exportProductId: "product_7bb38a7a-70b7-9cf3-fc80-584205694465",
        _id: "7bb38a7a-70b7-9cf3-fc80-584205694465",
        _createdDate: "2014-12-11T08:53:07.413Z",
      },
      {
        name: "I'm a product",
        slug: "i-m-a-product-5",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        sku: "36523641234523",
        weight: 0,
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: false,
          inStock: true,
          inventoryStatus: "IN_STOCK",
        },
        price: {
          currency: "VND",
          price: 15,
          discountedPrice: 15,
          formatted: {
            price: "15₫",
            discountedPrice: "15₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 15,
          discountedPrice: 15,
          formatted: {
            price: "15₫",
            discountedPrice: "15₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 15,
          discountedPrice: 15,
          formatted: {
            price: "15₫",
            discountedPrice: "15₫",
          },
        },
        priceRange: {
          minValue: 15,
          maxValue: 15,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Chair-Product.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg",
              width: 4000,
              height: 4000,
            },
            _id: "22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Chair-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg",
                width: 4000,
                height: 4000,
              },
              _id: "22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_6d297acebd3b4b2890f1a0e92b8a7158~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Chair-Context.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_6d297acebd3b4b2890f1a0e92b8a7158~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg",
                width: 2000,
                height: 2000,
              },
              _id: "22e53e_6d297acebd3b4b2890f1a0e92b8a7158~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: false,
        productOptions: [],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-5",
        },
        numericId: "1418288006255000",
        inventoryItemId: "c0495c37-6774-78aa-fb42-a3a651f4e715",
        discount: {
          type: "NONE",
          value: 0,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {},
            variant: {
              priceData: {
                currency: "VND",
                price: 15,
                discountedPrice: 15,
                formatted: {
                  price: "15₫",
                  discountedPrice: "15₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 15,
                discountedPrice: 15,
                formatted: {
                  price: "15₫",
                  discountedPrice: "15₫",
                },
              },
              weight: 0,
              sku: "36523641234523",
              visible: true,
            },
            stock: {
              trackQuantity: false,
              inStock: true,
            },
            _id: "00000000-0000-0000-0000-000000000000",
          },
        ],
        lastUpdated: "2024-10-03T16:28:03.192Z",
        ribbon: "",
        exportProductId: "product_3fb6a3c8-988b-8755-04bd-5c59ae0b18ea",
        _id: "3fb6a3c8-988b-8755-04bd-5c59ae0b18ea",
        _createdDate: "2014-12-11T08:53:26.255Z",
      },
      {
        name: "I'm a product",
        slug: "i-m-a-product-11",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        sku: "21554345656",
        weight: 0,
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: false,
          inStock: true,
          inventoryStatus: "IN_STOCK",
        },
        price: {
          currency: "VND",
          price: 120,
          discountedPrice: 120,
          formatted: {
            price: "120₫",
            discountedPrice: "120₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 120,
          discountedPrice: 120,
          formatted: {
            price: "120₫",
            discountedPrice: "120₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 120,
          discountedPrice: 120,
          formatted: {
            price: "120₫",
            discountedPrice: "120₫",
          },
        },
        priceRange: {
          minValue: 120,
          maxValue: 120,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Tshirt-Context.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_3716,h_3716,q_90/file.jpg",
              width: 3716,
              height: 3716,
            },
            _id: "22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Tshirt-Context.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_3716,h_3716,q_90/file.jpg",
                width: 3716,
                height: 3716,
              },
              _id: "22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Tshirt-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg",
                width: 4000,
                height: 4000,
              },
              _id: "22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: false,
        productOptions: [
          {
            optionType: "drop_down",
            name: "Size",
            choices: [
              {
                value: "Small",
                description: "Small",
                inStock: true,
                visible: true,
              },
              {
                value: "Large",
                description: "Large",
                inStock: true,
                visible: true,
              },
            ],
          },
        ],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-11",
        },
        numericId: "1418288018058000",
        inventoryItemId: "599710cc-0a47-9a96-2fb3-e2edc4197bbe",
        discount: {
          type: "NONE",
          value: 0,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {},
            variant: {
              priceData: {
                currency: "VND",
                price: 120,
                discountedPrice: 120,
                formatted: {
                  price: "120₫",
                  discountedPrice: "120₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 120,
                discountedPrice: 120,
                formatted: {
                  price: "120₫",
                  discountedPrice: "120₫",
                },
              },
              weight: 0,
              sku: "21554345656",
              visible: true,
            },
            stock: {
              trackQuantity: false,
              inStock: true,
            },
            _id: "00000000-0000-0000-0000-000000000000",
          },
        ],
        lastUpdated: "2024-10-03T16:28:03.192Z",
        ribbon: "",
        exportProductId: "product_a668ef33-f5b8-6569-d04c-1d123be68441",
        _id: "a668ef33-f5b8-6569-d04c-1d123be68441",
        _createdDate: "2014-12-11T08:53:38.058Z",
      },
      {
        name: "I'm a product",
        slug: "i-m-a-product-3",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: true,
          quantity: 200,
          inStock: true,
          inventoryStatus: "PARTIALLY_OUT_OF_STOCK",
        },
        price: {
          currency: "VND",
          price: 25,
          discountedPrice: 25,
          formatted: {
            price: "25₫",
            discountedPrice: "25₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 25,
          discountedPrice: 25,
          formatted: {
            price: "25₫",
            discountedPrice: "25₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 25,
          discountedPrice: 25,
          formatted: {
            price: "25₫",
            discountedPrice: "25₫",
          },
        },
        priceRange: {
          minValue: 50,
          maxValue: 50,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Sweater-Product.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_2662,h_2662,q_90/file.jpg",
              width: 2662,
              height: 2662,
            },
            _id: "22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Sweater-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_2662,h_2662,q_90/file.jpg",
                width: 2662,
                height: 2662,
              },
              _id: "22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_dc9ea8282a4944edab558992753a6d72~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Sweater-Model.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_dc9ea8282a4944edab558992753a6d72~mv2.jpg/v1/fit/w_3007,h_3007,q_90/file.jpg",
                width: 3007,
                height: 3007,
              },
              _id: "22e53e_dc9ea8282a4944edab558992753a6d72~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: true,
        productOptions: [
          {
            optionType: "drop_down",
            name: "Size",
            choices: [
              {
                value: "Small",
                description: "Small",
                media: {
                  items: [],
                },
                inStock: false,
                visible: true,
              },
              {
                value: "Medium",
                description: "Medium",
                media: {
                  items: [],
                },
                inStock: true,
                visible: true,
              },
              {
                value: "Large",
                description: "Large",
                media: {
                  items: [],
                },
                inStock: true,
                visible: true,
              },
            ],
          },
        ],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-3",
        },
        numericId: "1418288029710000",
        inventoryItemId: "e5d2817c-b410-ce2a-f61e-ccd911d8e3f6",
        discount: {
          type: "NONE",
          value: 0,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {
              Size: "Small",
            },
            variant: {
              priceData: {
                currency: "VND",
                price: 50,
                discountedPrice: 50,
                formatted: {
                  price: "50₫",
                  discountedPrice: "50₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 50,
                discountedPrice: 50,
                formatted: {
                  price: "50₫",
                  discountedPrice: "50₫",
                },
              },
              weight: 0,
              sku: "217537123517253",
              visible: true,
            },
            stock: {
              trackQuantity: true,
              quantity: 0,
              inStock: false,
            },
            _id: "6225f6cc-2dca-4da5-b7f0-52103e2a1dda",
          },
          {
            choices: {
              Size: "Medium",
            },
            variant: {
              priceData: {
                currency: "VND",
                price: 50,
                discountedPrice: 50,
                formatted: {
                  price: "50₫",
                  discountedPrice: "50₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 50,
                discountedPrice: 50,
                formatted: {
                  price: "50₫",
                  discountedPrice: "50₫",
                },
              },
              weight: 0,
              sku: "217537123517253",
              visible: true,
            },
            stock: {
              trackQuantity: true,
              quantity: 100,
              inStock: true,
            },
            _id: "072f13bf-d7bf-4365-ab6c-0861c347e0bf",
          },
          {
            choices: {
              Size: "Large",
            },
            variant: {
              priceData: {
                currency: "VND",
                price: 50,
                discountedPrice: 50,
                formatted: {
                  price: "50₫",
                  discountedPrice: "50₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 50,
                discountedPrice: 50,
                formatted: {
                  price: "50₫",
                  discountedPrice: "50₫",
                },
              },
              weight: 0,
              sku: "217537123517253",
              visible: true,
            },
            stock: {
              trackQuantity: true,
              quantity: 100,
              inStock: true,
            },
            _id: "723dd3f4-8feb-48a4-8ae6-16350f05054b",
          },
        ],
        lastUpdated: "2024-10-03T18:00:33.492Z",
        ribbon: "",
        exportProductId: "product_1a2d7e83-4bef-31d5-09e1-3326ee271c09",
        _id: "1a2d7e83-4bef-31d5-09e1-3326ee271c09",
        _createdDate: "2014-12-11T08:53:49.710Z",
      },
      {
        name: "I'm a product",
        slug: "i-m-a-product-10",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        sku: "671253175371",
        weight: 0,
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: false,
          inStock: true,
          inventoryStatus: "IN_STOCK",
        },
        price: {
          currency: "VND",
          price: 100,
          discountedPrice: 95,
          formatted: {
            price: "100₫",
            discountedPrice: "95₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 100,
          discountedPrice: 95,
          formatted: {
            price: "100₫",
            discountedPrice: "95₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 100,
          discountedPrice: 95,
          formatted: {
            price: "100₫",
            discountedPrice: "95₫",
          },
        },
        priceRange: {
          minValue: 100,
          maxValue: 100,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [
          {
            text: "Sale",
          },
        ],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Earrings-Product.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_3000,h_3000,q_90/file.jpg",
              width: 3000,
              height: 3000,
            },
            _id: "22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Earrings-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_3000,h_3000,q_90/file.jpg",
                width: 3000,
                height: 3000,
              },
              _id: "22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_924a086d18674cf281197d72d47207c1~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Earrings-Context.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_924a086d18674cf281197d72d47207c1~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg",
                width: 2000,
                height: 2000,
              },
              _id: "22e53e_924a086d18674cf281197d72d47207c1~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: false,
        productOptions: [],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-10",
        },
        numericId: "1418288044934000",
        inventoryItemId: "ad4f9a70-c4c2-8691-6acd-783286b97c9c",
        discount: {
          type: "PERCENT",
          value: 5,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {},
            variant: {
              priceData: {
                currency: "VND",
                price: 100,
                discountedPrice: 95,
                formatted: {
                  price: "100₫",
                  discountedPrice: "95₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 100,
                discountedPrice: 95,
                formatted: {
                  price: "100₫",
                  discountedPrice: "95₫",
                },
              },
              weight: 0,
              sku: "671253175371",
              visible: true,
            },
            stock: {
              trackQuantity: false,
              inStock: true,
            },
            _id: "00000000-0000-0000-0000-000000000000",
          },
        ],
        lastUpdated: "2024-10-03T16:28:03.192Z",
        ribbon: "Sale",
        exportProductId: "product_52b0658f-3b3d-796e-9532-87cd79468363",
        _id: "52b0658f-3b3d-796e-9532-87cd79468363",
        _createdDate: "2014-12-11T08:54:04.934Z",
      },
      {
        name: "I'm a product",
        slug: "i-m-a-product-7",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        sku: "632835642834572",
        weight: 0,
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: false,
          inStock: true,
          inventoryStatus: "IN_STOCK",
        },
        price: {
          currency: "VND",
          price: 40,
          discountedPrice: 40,
          formatted: {
            price: "40₫",
            discountedPrice: "40₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 40,
          discountedPrice: 40,
          formatted: {
            price: "40₫",
            discountedPrice: "40₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 40,
          discountedPrice: 40,
          formatted: {
            price: "40₫",
            discountedPrice: "40₫",
          },
        },
        priceRange: {
          minValue: 40,
          maxValue: 40,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Cap-Product.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg",
              width: 4000,
              height: 4000,
            },
            _id: "22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Cap-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg",
                width: 4000,
                height: 4000,
              },
              _id: "22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_f2d6c005d04646fd8bed4cffbca35c1e~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Cap-Context.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_f2d6c005d04646fd8bed4cffbca35c1e~mv2.jpg/v1/fit/w_2250,h_2250,q_90/file.jpg",
                width: 2250,
                height: 2250,
              },
              _id: "22e53e_f2d6c005d04646fd8bed4cffbca35c1e~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: false,
        productOptions: [],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-7",
        },
        numericId: "1418288087492000",
        inventoryItemId: "9498874b-39d9-3ff2-68d3-4ec727a1c0f8",
        discount: {
          type: "NONE",
          value: 0,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {},
            variant: {
              priceData: {
                currency: "VND",
                price: 40,
                discountedPrice: 40,
                formatted: {
                  price: "40₫",
                  discountedPrice: "40₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 40,
                discountedPrice: 40,
                formatted: {
                  price: "40₫",
                  discountedPrice: "40₫",
                },
              },
              weight: 0,
              sku: "632835642834572",
              visible: true,
            },
            stock: {
              trackQuantity: false,
              inStock: true,
            },
            _id: "00000000-0000-0000-0000-000000000000",
          },
        ],
        lastUpdated: "2024-10-03T16:28:03.192Z",
        ribbon: "",
        exportProductId: "product_6b6778b4-c626-c00d-972c-b138d85e3f07",
        _id: "6b6778b4-c626-c00d-972c-b138d85e3f07",
        _createdDate: "2014-12-11T08:54:47.492Z",
      },
      {
        name: "I'm a product",
        slug: "i-m-a-product-4",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        sku: "366615376135191",
        weight: 0,
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: false,
          inStock: true,
          inventoryStatus: "IN_STOCK",
        },
        price: {
          currency: "VND",
          price: 7.5,
          discountedPrice: 7.5,
          formatted: {
            price: "8₫",
            discountedPrice: "8₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 7.5,
          discountedPrice: 7.5,
          formatted: {
            price: "8₫",
            discountedPrice: "8₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 7.5,
          discountedPrice: 7.5,
          formatted: {
            price: "8₫",
            discountedPrice: "8₫",
          },
        },
        priceRange: {
          minValue: 7.5,
          maxValue: 7.5,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [
          {
            text: "New",
          },
        ],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Glasses-Product.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_3708,h_3709,q_90/file.jpg",
              width: 3708,
              height: 3709,
            },
            _id: "22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Glasses-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_3708,h_3709,q_90/file.jpg",
                width: 3708,
                height: 3709,
              },
              _id: "22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_ec22d9d4c6044e1eb996b4c86dd6af2b~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Glasses-Context.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_ec22d9d4c6044e1eb996b4c86dd6af2b~mv2.jpg/v1/fit/w_2938,h_2938,q_90/file.jpg",
                width: 2938,
                height: 2938,
              },
              _id: "22e53e_ec22d9d4c6044e1eb996b4c86dd6af2b~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: false,
        productOptions: [
          {
            optionType: "drop_down",
            name: "Size",
            choices: [
              {
                value: "Small",
                description: "Small",
                inStock: true,
                visible: true,
              },
              {
                value: "Large",
                description: "Large",
                inStock: true,
                visible: true,
              },
            ],
          },
        ],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-4",
        },
        numericId: "1418288149958000",
        inventoryItemId: "2662c337-438a-13b8-938d-08ecfe90670c",
        discount: {
          type: "NONE",
          value: 0,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {},
            variant: {
              priceData: {
                currency: "VND",
                price: 7.5,
                discountedPrice: 7.5,
                formatted: {
                  price: "8₫",
                  discountedPrice: "8₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 7.5,
                discountedPrice: 7.5,
                formatted: {
                  price: "8₫",
                  discountedPrice: "8₫",
                },
              },
              weight: 0,
              sku: "366615376135191",
              visible: true,
            },
            stock: {
              trackQuantity: false,
              inStock: true,
            },
            _id: "00000000-0000-0000-0000-000000000000",
          },
        ],
        lastUpdated: "2024-10-03T16:28:03.192Z",
        ribbon: "New",
        exportProductId: "product_d99d3cc8-bc75-ec47-6c72-f713016f98f3",
        _id: "d99d3cc8-bc75-ec47-6c72-f713016f98f3",
        _createdDate: "2014-12-11T08:55:49.958Z",
      },
      {
        name: "I'm a product",
        slug: "i-m-a-product-6",
        visible: true,
        productType: "physical",
        description:
          "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        sku: "364215376135199",
        weight: 0,
        weightRange: {
          minValue: 0,
          maxValue: 0,
        },
        stock: {
          trackInventory: false,
          inStock: true,
          inventoryStatus: "IN_STOCK",
        },
        price: {
          currency: "VND",
          price: 85,
          discountedPrice: 85,
          formatted: {
            price: "85₫",
            discountedPrice: "85₫",
          },
        },
        priceData: {
          currency: "VND",
          price: 85,
          discountedPrice: 85,
          formatted: {
            price: "85₫",
            discountedPrice: "85₫",
          },
        },
        convertedPriceData: {
          currency: "VND",
          price: 85,
          discountedPrice: 85,
          formatted: {
            price: "85₫",
            discountedPrice: "85₫",
          },
        },
        priceRange: {
          minValue: 85,
          maxValue: 85,
        },
        costRange: {
          minValue: 0,
          maxValue: 0,
        },
        additionalInfoSections: [
          {
            title: "PRODUCT INFO",
            description:
              "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
          },
          {
            title: "RETURN & REFUND POLICY",
            description:
              "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
          },
          {
            title: "SHIPPING INFO",
            description:
              "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
          },
        ],
        ribbons: [],
        media: {
          mainMedia: {
            thumbnail: {
              url: "https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
              width: 50,
              height: 50,
            },
            mediaType: "image",
            title: "Cream-Context.jpg",
            image: {
              url: "https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg",
              width: 4000,
              height: 4000,
            },
            _id: "22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg",
          },
          items: [
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Cream-Context.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg",
                width: 4000,
                height: 4000,
              },
              _id: "22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg",
            },
            {
              thumbnail: {
                url: "https://static.wixstatic.com/media/22e53e_58f292496eec45eea41b21308739ae1c~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg",
                width: 50,
                height: 50,
              },
              mediaType: "image",
              title: "Cream-Product.jpg",
              image: {
                url: "https://static.wixstatic.com/media/22e53e_58f292496eec45eea41b21308739ae1c~mv2.jpg/v1/fit/w_3330,h_3329,q_90/file.jpg",
                width: 3330,
                height: 3329,
              },
              _id: "22e53e_58f292496eec45eea41b21308739ae1c~mv2.jpg",
            },
          ],
        },
        customTextFields: [],
        manageVariants: false,
        productOptions: [
          {
            optionType: "drop_down",
            name: "Size",
            choices: [
              {
                value: "80 ml",
                description: "80 ml",
                inStock: true,
                visible: true,
              },
              {
                value: "250 ml",
                description: "250 ml",
                inStock: true,
                visible: true,
              },
              {
                value: "500 ml",
                description: "500 ml",
                inStock: true,
                visible: true,
              },
            ],
          },
        ],
        productPageUrl: {
          base: "https://201106362.wixsite.com/printify",
          path: "/product-page/i-m-a-product-6",
        },
        numericId: "1418288158573000",
        inventoryItemId: "15880dcf-aa70-a849-322e-f45a9a1707d8",
        discount: {
          type: "NONE",
          value: 0,
        },
        collectionIds: [
          "d496e940-5a3c-e342-4836-8b39155c5eae",
          "00000000-000000-000000-000000000001",
        ],
        variants: [
          {
            choices: {},
            variant: {
              priceData: {
                currency: "VND",
                price: 85,
                discountedPrice: 85,
                formatted: {
                  price: "85₫",
                  discountedPrice: "85₫",
                },
              },
              convertedPriceData: {
                currency: "VND",
                price: 85,
                discountedPrice: 85,
                formatted: {
                  price: "85₫",
                  discountedPrice: "85₫",
                },
              },
              weight: 0,
              sku: "364215376135199",
              visible: true,
            },
            stock: {
              trackQuantity: false,
              inStock: true,
            },
            _id: "00000000-0000-0000-0000-000000000000",
          },
        ],
        lastUpdated: "2024-10-03T16:28:03.192Z",
        ribbon: "",
        exportProductId: "product_ea77f230-558f-57b6-cdd1-0ba565e8f827",
        _id: "ea77f230-558f-57b6-cdd1-0ba565e8f827",
        _createdDate: "2014-12-11T08:55:58.573Z",
      },
    ],
  };
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res?.items.map((product: any) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-2xl z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-2xl"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {/* {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )} */}
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      {/* {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null} */}
    </div>
  );
};

export default ProductList;
