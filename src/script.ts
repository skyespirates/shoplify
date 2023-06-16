interface IProduct {
  id: number;
  name: string;
  price: number;
  year: number;
}

class Product implements IProduct {
  static count: number = 0;
  private _id: number;
  constructor(
    private _name: string,
    private _price: number,
    private _year: number
  ) {
    this._id = ++Product.count;
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  public get price(): number {
    return this._price;
  }

  public set price(v: number) {
    this._price = v;
  }

  public get year(): number {
    return this._year;
  }

  public set year(v: number) {
    this._year = v;
  }

  public get id(): number {
    return this._id;
  }

  public set id(v: number) {
    this._id = v;
  }
}

interface IUI {
  addProduct(product: Product): void;
  resetForm(): void;
  deleteProduct(element: any): void;
  showAlert(message: string, cssClass: "success" | "danger"): void;
}

class UI implements IUI {
  addProduct(product: Product): void {
    const output = document.querySelector(".output") as HTMLDivElement;
    const element = document.createElement("div") as HTMLDivElement;
    element.className = "card";
    element.innerHTML = `
    <div class="card-body">
                <h5 class="text-center">${product.name}</h5>
                <div class="info mx-auto d-flex justify-content-between">
                  <span> <strong>Price</strong>: Rp ${product.price} </span>
                  <span> <strong>Year</strong>: ${product.year} </span>
                    <i role="button" class="ri-delete-bin-7-fill ri-xl text-danger"></i>
                </div>
              </div>
    `;
    output.appendChild(element);
  }
  resetForm(): void {
    const form = document.querySelector("form") as HTMLFormElement;
    form.reset();
  }
  deleteProduct(element: any): void {
    const button = element.role;

    if (button === "button") {
      element.parentElement.parentElement.parentElement.remove();
      return;
    }
  }

  showAlert(message: string, cssClass: string): void {
    const alert = document.createElement("div") as HTMLDivElement;
    alert.className = `alert alert-${cssClass} text-center`;
    alert.appendChild(document.createTextNode(message));
    // insert between container and grid
    const parent = document.querySelector(".grid")?.parentNode!;
    const child = document.querySelector(".grid");

    parent.insertBefore(alert, child);
    setTimeout(() => {
      document.querySelector(".alert")?.remove();
    }, 1000);
  }
}

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const name = document.getElementById("product-name") as HTMLInputElement;
  const price = document.getElementById("product-price") as HTMLInputElement;
  const year = document.getElementById("product-year") as HTMLInputElement;

  const product = new Product(name.value, +price.value, +year.value);
  const ui = new UI();
  ui.addProduct(product);
  ui.showAlert("Product added successfully!", "primary");
  ui.resetForm();
});

const output = document.querySelector(".output") as HTMLDivElement;
output.addEventListener("click", (e) => {
  e.preventDefault();
  const ui = new UI();
  ui.deleteProduct(e.target);
  ui.showAlert("Product removed successfully!", "danger");
});
