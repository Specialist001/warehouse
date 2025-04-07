<?php

namespace App\Services\EAN;

use AllowDynamicProperties;
use Illuminate\Support\Facades\Http;

#[AllowDynamicProperties] class OpenFoodFactsService
{
    public function __construct()
    {
        $this->baseUrl = env("OPENFOODFACTS_URL", "https://world.openfoodfacts.org/api/v3/product/");
    }

    public function getProductMainData(string $barcode): ?array
    {
        $product = $this->getProduct($barcode);
        if (!$product) {
            return null;
        }

        if ($product['status'] === 'failure') {
            return [
                "code"   => $product['code'],
                "errors" => $product['errors'],
                "result" => $product['result'],
            ];
        } elseif ($product['status'] === 'success') {
            return [
                "code"    => $product['code'],
                "status"  => $product['status'],
                "product" => [
                    "name"                  => $product['product']['product_name'],
                    "name_ru"               => $product['product']['product_name_ru'],
                    "product_quantity"      => $product['product']['product_quantity'],
                    "product_quantity_unit" => $product['product']['product_quantity_unit'],
                    "type"                  => $product['product']['product_type'],
                    "quantity"              => $product['product']['quantity'],
                    "brands"                => $product['product']['brands'],
                    "categories"            => $product['product']['categories'],
                    "categories_old"        => $product['product']['categories_old'],
                    "countries"             => $product['product']['countries'],
                    "countries_hierarchy"   => $product['product']['countries_hierarchy'],
                    "labels"                => $product['product']['labels'],
                    "ingredients_text"      => $product['product']['ingredients_text'],
                    "image_url"             => $product['product']['image_url'],
                    "lang"                  => $product['product']['lang'],
                    "languages_codes"       => $product['product']['languages_codes'],
                ],
                "result"  => $product['result'],
            ];
        }

        return null;
    }

    public function getProduct(string $barcode): ?array
    {
        $response = Http::get($this->baseUrl . $barcode . '.json');

        if ($response->failed()) {
            return null;
        }

        return $response->json();
    }
}
