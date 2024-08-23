-- CreateTable
CREATE TABLE "CollaboratorsInvites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollaboratorsInvites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicLinks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MagicLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MagicLinks_userId_key" ON "MagicLinks"("userId");

-- AddForeignKey
ALTER TABLE "MagicLinks" ADD CONSTRAINT "MagicLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
