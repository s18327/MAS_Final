import { ComponentSpecification } from "./models/ComponentSpecification";
import { ComponentStock } from "./models/ComponentStock";
import { CustomerOrder } from "./models/CustomerOrder";
import { Specification } from "./models/Specification";
import { FinalProduct } from "./models/FinalProduct";
import { OrderProduct } from "./models/OrderProduct";
import { PcComponent } from "./models/PcComponent";
import { StorageUnit } from "./models/StorageUnit";
import { PcBuilder } from "./models/PcBuilder";
import { Customer } from "./models/Customer";
import { Product } from "./models/Product";
import { Manager } from "./models/Manager";

/**
 * @function injectData - injects data to database
 * @param connection = connection to the database ( persistance )
 * fills the database with data
 */

export async function injectData(connection) {
  // product of type pcComponent representing a gpu
  const gpuOne = new Product();
  gpuOne.name = "2080 Ti";
  gpuOne.price = 5000;
  gpuOne.prodTypes = [];
  const gpuOneComponent = new PcComponent();
  gpuOneComponent.componentType = "gpu";
  gpuOne.pcComponent = gpuOneComponent;
  await connection.manager.save(gpuOne);

  // product of type pcComponent representing a ram
  const ramOne = new Product();
  ramOne.name = "3600 cl 16";
  ramOne.price = 1200;
  ramOne.prodTypes = [];
  const ramOneComponent = new PcComponent();
  ramOneComponent.componentType = "ram";
  ramOne.pcComponent = ramOneComponent;
  await connection.manager.save(ramOne);

  // product of type pcComponent representing a case
  const pcCase = new Product();
  pcCase.name = "full tower case nzxt";
  pcCase.price = 600;
  pcCase.prodTypes = [];
  const pcCaseComponent = new PcComponent();
  pcCaseComponent.componentType = "case";
  pcCase.pcComponent = pcCaseComponent;
  await connection.manager.save(pcCase);

  // product of type pcComponent representing a cpu
  const cpuOne = new Product();
  cpuOne.name = "Ryzen 5";
  cpuOne.price = 2300;
  cpuOne.prodTypes = [];
  const cpuOneComponent = new PcComponent();
  cpuOneComponent.componentType = "cpu";
  cpuOne.pcComponent = cpuOneComponent;
  await connection.manager.save(cpuOne);

  // product of type finalProduct representing a nas server
  const dataServer = new Product();
  dataServer.name = "nas server";
  dataServer.price = 13000;
  dataServer.prodTypes = [];
  const dataServerProduct = new FinalProduct();
  dataServerProduct.category = "server";
  dataServer.finalProduct = dataServerProduct;
  await connection.manager.save(dataServer);

  // product of type finalProduct representing a laptop
  const laptop = new Product();
  laptop.name = "dell xps 15";
  laptop.price = 10000;
  laptop.prodTypes = [];
  const laptopProduct = new FinalProduct();
  laptopProduct.category = "laptop";
  laptop.finalProduct = laptopProduct;
  await connection.manager.save(laptop);

  // product of type finalProduct representing a gaming pc
  const gamingMachinePremium = new Product();
  gamingMachinePremium.name = "gaming machine premium";
  gamingMachinePremium.price = 13000;
  gamingMachinePremium.prodTypes = [];
  const gamingMachinePremiumProduct = new FinalProduct();
  gamingMachinePremiumProduct.category = "pc";
  gamingMachinePremium.finalProduct = gamingMachinePremiumProduct;
  await connection.manager.save(gamingMachinePremium);

  // product of type finalProduct representing a dell workstation pc
  const workStation = new Product();
  workStation.name = "dell workstation";
  workStation.price = 18000;
  workStation.prodTypes = [];
  const workStationProduct = new FinalProduct();
  workStationProduct.category = "pc";
  workStation.finalProduct = workStationProduct;
  await connection.manager.save(workStation);

  // product of type finalProduct representing a ram (single component as a finalProduct)
  const ram = new Product();
  ram.name = "ram set";
  ram.price = 1300;
  ram.prodTypes = [];
  const ramProduct = new FinalProduct();
  ramProduct.category = "ram";
  ram.finalProduct = ramProduct;
  await connection.manager.save(ram);

  // storage unit representing storage for the components
  const storage = new StorageUnit();
  storage.name = "arkadia";
  const componentStock = new ComponentStock();
  componentStock.stock = 10;
  storage.componentStock = [componentStock];
  if (storage.componentStock) storage.componentStock.push(componentStock);
  else storage.componentStock = [componentStock];
  componentStock.pcComponent = gpuOneComponent;
  await connection.manager.save(storage);

  //specification for the gaming machine containing the component specifications
  const productOneSpecification = new Specification();
  productOneSpecification.skillTierRequired = 3;
  productOneSpecification.description = "product one specification";
  productOneSpecification.finalProduct = gamingMachinePremiumProduct;
  const productOneComponentOneSpecification = new ComponentSpecification();
  productOneComponentOneSpecification.amount = 2;
  productOneComponentOneSpecification.pcComponent = gpuOneComponent;
  productOneComponentOneSpecification.comment = "air cooled";
  const productOneComponentTwoSpecification = new ComponentSpecification();
  productOneComponentTwoSpecification.amount = 1;
  productOneComponentTwoSpecification.pcComponent = cpuOneComponent;
  productOneComponentTwoSpecification.comment =
    "standard passive air cooler with double fans";
  productOneSpecification.componentSpecifications = [
    productOneComponentOneSpecification,
    productOneComponentTwoSpecification,
  ];
  await connection.manager.save(productOneSpecification);

  //specification for the workstation containing the component specifications
  const productTwoSpecification = new Specification();
  productTwoSpecification.skillTierRequired = 4;
  productTwoSpecification.description = "product two specification";
  productTwoSpecification.finalProduct = workStationProduct;
  const productTwoComponentOneSpecification = new ComponentSpecification();
  productTwoComponentOneSpecification.amount = 1;
  productTwoComponentOneSpecification.pcComponent = gpuOneComponent;
  productTwoComponentOneSpecification.comment = "air cooled";
  const productTwoComponentTwoSpecification = new ComponentSpecification();
  productTwoComponentTwoSpecification.amount = 1;
  productTwoComponentTwoSpecification.pcComponent = cpuOneComponent;
  productTwoComponentTwoSpecification.comment =
    "water-cooled with default radiator";
  productTwoSpecification.componentSpecifications = [
    productTwoComponentOneSpecification,
    productTwoComponentTwoSpecification,
  ];
  await connection.manager.save(productTwoSpecification);

  //specification for the laptop containing the component specifications
  const productThreeSpecification = new Specification();
  productThreeSpecification.skillTierRequired = 2;
  productThreeSpecification.description = "product three specification";
  productThreeSpecification.finalProduct = laptopProduct;
  const productThreeComponentOneSpecification = new ComponentSpecification();
  productThreeComponentOneSpecification.amount = 1;
  productThreeComponentOneSpecification.pcComponent = ramOneComponent;
  productThreeComponentOneSpecification.comment = "air cooled";
  const productThreeComponentTwoSpecification = new ComponentSpecification();
  productThreeComponentTwoSpecification.amount = 1;
  productThreeComponentTwoSpecification.pcComponent = cpuOneComponent;
  productThreeComponentTwoSpecification.comment = "standard 15 inch laptop";
  productThreeSpecification.componentSpecifications = [
    productThreeComponentOneSpecification,
    productThreeComponentTwoSpecification,
  ];
  await connection.manager.save(productThreeSpecification);

  //specification for the ram containing the component specifications
  const productFourSpecification = new Specification();
  productFourSpecification.skillTierRequired = 1;
  productFourSpecification.description = "ram";
  productFourSpecification.finalProduct = ramProduct;
  const productFourComponentOneSpecification = new ComponentSpecification();
  productFourComponentOneSpecification.amount = 2;
  productFourComponentOneSpecification.pcComponent = ramOneComponent;
  productFourComponentOneSpecification.comment = "RGB memory";
  productFourSpecification.componentSpecifications = [
    productFourComponentOneSpecification,
  ];
  await connection.manager.save(productFourSpecification);

  //specification for the nas server containing the component specifications
  const productFiveSpecification = new Specification();
  productFiveSpecification.skillTierRequired = 4;
  productFiveSpecification.description = "storage server";
  productFiveSpecification.finalProduct = dataServerProduct;
  const productFiveComponentOneSpecification = new ComponentSpecification();
  productFiveComponentOneSpecification.amount = 10;
  productFiveComponentOneSpecification.pcComponent = ramOneComponent;
  productFiveComponentOneSpecification.comment = "server grade";
  productFiveSpecification.componentSpecifications = [
    productFiveComponentOneSpecification,
  ];
  await connection.manager.save(productFiveSpecification);

  // customer
  const customer = new Customer();
  customer.name = "Jakub Glowacki";
  customer.phone = 507430180;
  customer.storageUnit = storage;
  await connection.manager.save(customer);

  // second customer that is premium
  const customerTwo = new Customer();
  customerTwo.name = "Jakub Goralczyk";
  customerTwo.phone = 605844999;
  customer.isPremium = true;
  customerTwo.storageUnit = storage;
  await connection.manager.save(customerTwo);

  // third customer
  const customerThree = new Customer();
  customerThree.name = "James Bond";
  customerThree.phone = 550212321;
  customerThree.storageUnit = storage;
  await connection.manager.save(customerThree);

  // manager
  const manager = new Manager();
  manager.name = "George Johnson";
  manager.phone = 507430181;
  manager.salary = 8000;
  await connection.manager.save(manager);

  // pc builder that has a salary and max skill tier
  const pcBuilderOne = new PcBuilder();
  pcBuilderOne.name = "Bob the Builder";
  pcBuilderOne.phone = 507430182;
  pcBuilderOne.salary = 5000;
  pcBuilderOne.skillTier = 4;
  await connection.manager.save(pcBuilderOne);

  // pc builder that has a pay per hour
  const pcBuilderTwo = new PcBuilder();
  pcBuilderTwo.name = "John Johnson";
  pcBuilderTwo.phone = 507430188;
  pcBuilderTwo.payPerHour = 21;
  pcBuilderTwo.skillTier = 3;
  await connection.manager.save(pcBuilderTwo);

  // pc builder that has a pay per hour
  const pcBuilderThree = new PcBuilder();
  pcBuilderThree.name = "James Brown";
  pcBuilderThree.phone = 991231123;
  pcBuilderThree.payPerHour = 21;
  pcBuilderThree.skillTier = 4;
  await connection.manager.save(pcBuilderThree);

  // customer order with a custom label
  const order = new CustomerOrder();
  order.label = "birthday gift";
  order.customer = customer;
  order.manager = manager;
  order.toBeReadyAt = new Date("2022-07-20T12:00:00");
  order.storageUnit = customer.storageUnit;
  order.orderProducts = [];
  const orderGamingMachinePremium = new OrderProduct();
  orderGamingMachinePremium.finalProduct = gamingMachinePremiumProduct;
  const orderWorkStation = new OrderProduct();
  orderWorkStation.finalProduct = workStationProduct;
  order.orderProducts = [orderGamingMachinePremium, orderWorkStation];
  await connection.manager.save(order);

  // customer order with a custom label
  const order2 = new CustomerOrder();
  order2.label = "mothersday";
  order2.customer = customerThree;
  order2.manager = manager;
  order2.toBeReadyAt = new Date("2022-09-20T14:00:00");
  order2.storageUnit = customerThree.storageUnit;
  const orderGamingMachinePremiumAgain = new OrderProduct();
  orderGamingMachinePremiumAgain.finalProduct = gamingMachinePremiumProduct;
  order2.orderProducts = [orderGamingMachinePremiumAgain];
  await connection.manager.save(order2);

  // customer order with a custom label
  const order3 = new CustomerOrder();
  order3.label = "cool gift";
  order3.customer = customerTwo;
  order3.manager = manager;
  order3.toBeReadyAt = new Date("2022-08-20T14:00:00");
  order3.storageUnit = customerTwo.storageUnit;
  const orderWorkstation = new OrderProduct();
  orderWorkstation.finalProduct = workStationProduct;
  const orderRam = new OrderProduct();
  orderRam.finalProduct = ramProduct;
  const orderLaptop = new OrderProduct();
  orderLaptop.finalProduct = laptopProduct;
  order3.orderProducts = [orderWorkstation, orderRam, orderLaptop];
  await connection.manager.save(order3);

  // customer order with a custom label
  const order4 = new CustomerOrder();
  order4.label = " birthday gift";
  order4.customer = customerTwo;
  order4.manager = manager;
  order4.toBeReadyAt = new Date("2022-07-20T12:00:00");
  order4.storageUnit = customerTwo.storageUnit;
  const orderDataServer = new OrderProduct();
  orderDataServer.finalProduct = dataServerProduct;
  const orderLaptopTwo = new OrderProduct();
  orderLaptopTwo.finalProduct = laptopProduct;
  const orderGamingMachinePremiumTwo = new OrderProduct();
  orderGamingMachinePremiumTwo.finalProduct = gamingMachinePremiumProduct;
  order4.orderProducts = [
    orderDataServer,
    orderLaptopTwo,
    orderGamingMachinePremiumTwo,
  ];
  await connection.manager.save(order4);

  // customer order with a custom label
  const order5 = new CustomerOrder();
  order5.label = "nameDay gift";
  order5.customer = customerThree;
  order5.manager = manager;
  order5.toBeReadyAt = new Date("2022-07-20T12:00:00");
  order5.storageUnit = customerThree.storageUnit;
  const orderRamTwo = new OrderProduct();
  orderRamTwo.finalProduct = ramProduct;
  order5.orderProducts = [orderRamTwo];
  await connection.manager.save(order5);
}
