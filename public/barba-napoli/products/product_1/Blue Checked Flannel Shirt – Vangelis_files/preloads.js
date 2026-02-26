
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.D-3tW6RD.js","/cdn/shopifycloud/checkout-web/assets/c1/app.Ckc3eFud.js","/cdn/shopifycloud/checkout-web/assets/c1/vendor.C1-HyOcO.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.DKn3c4yx.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.CPhJkh0V.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.Bjg7udnY.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup.DrcliUZT.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.680zY42I.js","/cdn/shopifycloud/checkout-web/assets/c1/colorContrast.NjsdnSUv.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment.D-gcFZ-a.js","/cdn/shopifycloud/checkout-web/assets/c1/PickupPointCarrierLogo.DF2pYolj.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks.CfeAiF1W.js","/cdn/shopifycloud/checkout-web/assets/c1/AddDiscountButton.Bke2e1cd.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.C0o4PH3g.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.DC9PEKDh.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.BhD91N3t.js","/cdn/shopifycloud/checkout-web/assets/c1/OrderEditVaultedDelivery.HuFwIq0o.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList.DcoCTTAn.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayErrorBanner.BmEV692M.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayQuery.CjBk38Qq.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.BY4L5cN8.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.DoN-7fMW.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-js-index.BWr2FsNo.js","/cdn/shopifycloud/checkout-web/assets/c1/v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/monorail.v5Aq3D-m.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions.BH9VkXeP.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.BnVZY6a-.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.B8YX4ujj.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.03gtV8Ct.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.DY1jRhuP.js","/cdn/shopifycloud/checkout-web/assets/c1/rendering-extension-targets.CYbSwACP.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.Bf0vPUE9.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.fACE5trN.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.C5cOHKN5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.6gWii3xb.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AddDiscountButton.CZ33y7Va.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.7lB-c-sA.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.WW3cs_z5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DutyOptions.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PickupPointCarrierLogo.DuZuWHqZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.V0VYEO4K.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0273/8814/9795/files/Vangelis_logga-profilbild_29da9216-9d9a-4301-a384-025420dc5210_x320.jpg?v=1614297137"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  