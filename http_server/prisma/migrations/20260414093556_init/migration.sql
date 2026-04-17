-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userBalance" INTEGER NOT NULL DEFAULT 5000,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Btc_1_min" (
    "id" SERIAL NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Btc_1_min_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sol_1_min" (
    "id" SERIAL NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sol_1_min_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eth_1_min" (
    "id" SERIAL NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Eth_1_min_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
