#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Mng.API/Mng.API.csproj", "Mng.API/"]
COPY ["Mng.CORE/Mng.CORE.csproj", "Mng.CORE/"]
COPY ["Mng.DATA/Mng.DATA.csproj", "Mng.DATA/"]
COPY ["Mng.SERVICES/Mng.SERVICES.csproj", "Mng.SERVICES/"]
RUN dotnet restore "./Mng.API/./Mng.API.csproj"
COPY . .
WORKDIR "/src/Mng.API"
RUN dotnet build "./Mng.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Mng.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mng.API.dll"]