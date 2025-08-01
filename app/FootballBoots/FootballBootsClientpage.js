"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import BrandsSlider from '../Componants/brandsSplide_1';
import FilterDropdown from '../Componants/CheckboxDropdown ';
import ProductSlider from '../Componants/ProductSlider';
import { useTranslation } from '../contexts/TranslationContext';

export default function FootballClientPage({ products, brands, attributeValues }) {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const result = products.filter((product) => {
      const attrs = product.node.attributeValues;
      const brandMatch = !selectedBrand || product.node.brand?.name === selectedBrand;
      const attributesMatch = Object.entries(selectedAttributes).every(([attr, values]) => {
        if (values.length === 0) return true;
        return attrs.some((a) => a.attribute?.label === attr && values.includes(a.label));
      });
      const categoryMatch = !selectedCategory || product.node.categories.some(cat => cat.name === selectedCategory);
      return brandMatch && attributesMatch && categoryMatch;
    });

    setFilteredProducts(result);
  }, [products, selectedBrand, selectedAttributes, selectedCategory]);

  const sidebarItems = [
   { label: 'Goalkeeper Gloves', link : '/GoalkeeperGloves' ,children: [] },
    {
      label: 'Football Boots',
      link: '/FootballBoots',
      children: [
        {
          group: "Adult",
          items: ['Studs', 'Cleats', 'Artificial grass', 'Firm ground', 'Hard court', 'Accessories']
        },
        {
          group: "Kids",
          items: ['Leisure kids', 'Kids football boots', 'Kids studs', 'Artificial grass kids', 'Firm ground kids', 'Hard court kids']
        }
      ]
    },
    {
      label: 'Goalkeeper Apparel',
      link: '/Apparel',
      children: [
        {
          group: "Clothing",
          items: [
            'Goalkeeper undershorts',
            'Goalkeeper undershirts',
            'Goalkeeper pants',
            'Goalkeeper jerseys',
            'Goalkeeper set',
            'Training tops',
            'Goalkeeper training tops'
          ]
        }
      ]
    },
    {
      label: 'Goalkeeper Equipment',
      link: '/Equipmen',
      children: [
        {
          group: "Care & Protection",
          items: [
            "Glove Wash", "Miscellaneous", "Care", "Grip enhancer", "Towels", "Bandages", "Tapes / Pavings"
          ]
        },
        {
          group: "Gear",
          items: [
            "GK-Bag", "Shin Pads", "Elbow Pads", "Knee Pads", "Helmets", "Genital", "Water Bottles", "Studs", "Training aids", "Under gloves", "Key Rings", "Online goalkeeper training"
          ]
        }
      ]
    },
     {
        label: 'Teamsport',
        link: '/Teamsport',
        children: [
          {
            group: "Tops",
            items: [
              "Jerseys", "Training tops", "T-Shirt", "Jackets", "All weather jackets", "Sweatshirts" , "Polo shirts"  
            ]
          },
          {
            group: "Pants",
            items: [
              "Long pants", "Shorts"
            ]
          }
          ,
          {
            group: "Pants",
            items: [
              "Long pants", "Shorts"
            ]
          }
          ,
          {
            group: "Underwear",
            items: [
              "Long pants", "Shorts"
            ]
          }
          ,
         

        ]
      },
    { label: 'Sale', children: [] },
  ];


  return (
    <div className='bg-[#373e3e]'>
    <div className="grid pt-4 grid-cols-1 md:grid-cols-5">
      <div className="md:col-span-1 bg-[#1f2323]">
        <ul className='flex flex-col text-white'>
          {sidebarItems.map((item, i) => (
            <li key={i} className='border-b border-[#2a2e2e]'>
              <div className='text-base p-4 hover:bg-[#303434] cursor-pointer flex justify-between items-center'>
                {item.link ? (
                  <Link href={item.link} className='flex-1'>
                    {t(item.label)}
                  </Link>
                ) : (
                  <div
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className='flex-1'
                  >
                    {t(item.label)}
                  </div>
                )}
                {item.children.length > 0 && (
                  <span
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className='text-base px-2 cursor-pointer'
                  >
                    {openDropdown === item.label ? '−' : '▼'}
                  </span>
                )}
              </div>

              {item.children.length > 0 && openDropdown === item.label && (
                <ul className='bg-[#2a2e2e] transition-all duration-300'>
                  {item.children.map((group, gIdx) => (
                    <li key={gIdx} className="py-2 border-t border-[#383d3d]">
                      <p className='px-6 py-1 text-sm font-semibold text-amber-200'>
                        {t(group.group)}
                      </p>
                      {group.items.map((child, idx) => (
                        <div
                          key={idx}
                          className='px-6 py-2 hover:bg-[#383d3d] text-base cursor-pointer'
                          onClick={() => setSelectedCategory(child)}
                        >
                          {t(child)}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

        <div className="md:col-span-4 p-4 bg-white">
          <h1 className='text-4xl text-[#1f2323] p-2'>
            {selectedCategory ? t(selectedCategory) : t("Football Boots")}
          </h1>

          <BrandsSlider
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandClick={(brand) =>
              setSelectedBrand(brand === selectedBrand ? null : brand)
            }
          />

          <div className='flex mb-4 gap-3 flex-wrap'>
            <FilterDropdown
              attributeValues={attributeValues}
              onFilterChange={setSelectedAttributes}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-2 sm:p-4'>
            {filteredProducts.map((edge) => (
              <div
                key={edge.node.sku}
                className="bg-gradient-to-br from-white to-neutral-200 rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <ProductSlider
                  images={edge.node.images}
                  productName={edge.node.name}
                />

                <Link href={`/product/${encodeURIComponent(edge.node.sku)}`} className="p-4 flex flex-col flex-grow justify-between">
                  <div className="bg-neutral-400 text-amber-100 text-xs font-semibold w-fit px-3 py-1 rounded-full mb-3">
                    {edge.node.categories.map((cat) => cat.name).join(", ")}
                  </div>

                  <h3 className="text-base text-gray-700 text-center font-bold mb-1">
                    {edge.node.brand?.name}
                  </h3>

                  <p className="text-center text-sm text-gray-500 line-clamp-2 mb-3">
                    {edge.node.name}
                  </p>

                  <h2 className="text-center font-bold text-lg text-gray-800">
                    $98 <span className="text-sm text-gray-500 ml-1">99</span>
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}






