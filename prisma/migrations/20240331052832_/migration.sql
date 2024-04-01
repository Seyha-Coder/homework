-- CreateTable
CREATE TABLE "Categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "customer_id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "birth_date" DATE NOT NULL,
    "money_spent" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "order_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "order_total" DOUBLE PRECISION NOT NULL,
    "order_qty" INTEGER NOT NULL,
    "order_date" TIMESTAMP NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_product_name_key" ON "Products"("product_name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;
