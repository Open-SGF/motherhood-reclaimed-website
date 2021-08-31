<?php

return [
  // array of image styles. The name of the style will be the key,
  // and the configuration of the style will be the value.
  // These styles are used to generate picture and img elements
  // with craft.picture.element
  'imageStyles' => [

    // this is the 'thumb' style. It will generate an img like:
    // <img
    //   srcset="transform75pxUrl 75w, transform150pxUrl 150w"
    //   sizes="75px"
    //   src="transform75pxUrl"
    // />
    'thumb' => [
      // since the 'thumb' style has no sources, it will generate
      // an img element, not a picture element
      'img' => [
        // optional aspect ratio, width / height. Will use the
        // native aspect ratio of the asset if not specified
        // This will be square
        'aspectRatio' => 1,
        // the 'sizes' attribute of the element
        'sizes' => '75px',
        // pixel widths for the generated images. The first
        // element in the array will be the width of the default
        // src
        'widths' => [75, 150]
      ]
    ],

    'sliderBackgroundStyle' => [
      'img' => [
        'sizes' => '200px 600px 1200px 1800px',
        'widths' => [200, 600, 1200, 1800],
      ]
    ],

    'imageTextCalloutStyle' => [
      'img' => [
        'sizes' => '678px',
        'widths' => [300, 678]
      ]
    ],
    
    // the 'art' style will generate a picture element with two
    // nested source elements and a nested img element
    'art' => [

      // since there is a sources array, this will generate a
      // picture element. sources is an array of source
      // configurations
      'sources' => [
        // on narrow screens, we are going to have a 4x3
        // small image. This source element will look like:
        // <source
        //   media="(max-sidth: 600px)"
        //   srcset="t100pxUrl 100w, t200pxUrl 200w"
        //   sizes="100px"
        // />
        [
          // optional 'media' attribute for this source
          // (the 'media' attribute is required on all but
          // the last source)
          'media' => '(max-width: 600px)',
          // optional aspect ratio
          'aspectRatio' => 4/3,
          'sizes' => '100px',
          'widths' => [100, 200],
        ],
        // on other screens we are going to use the native aspect
        // ratio. The image will be 1/2 the screen width up to
        // 1000px, and 500px after that. The source element:
        // <source
        //   srcset="t500pxUrl 500w, t1000pxUrl 1000w"
        //   sizes="(max-width: 1000px) 50vw, 500px"
        // />
        [
          // sizes is just a string, but we can use php to make it
          // easier to construct
          'sizes' => implode(', ', [
            '(max-width: 1000px) 50vw',
            '500px'
          ]),
          'widths' => [500, 1000]
        ]
      ],

      // the img element is required. We just need a fallback src,
      // this will be 500px wide (no srcset when there is only one
      // width).
      // <img src="t500pxUrl" />
      'img' => [
        'widths' => [500]
      ],

      // transform is optional, and specifies parameters for
      // the Craft transforms for the style
      'transform' => [
        'format' => 'jpg'
      ]
    ],

    // the 'lazyLoaded' style for elements that use lazysizes for lazyloading.
    // See also lazysizesTrigger config value
    // <img
    //   class="lazyload"
    //   data-srcset="transform500pxUrl 500w, transform1000pxUrl 1000w"
    //   data-sizes="25vw"
    //   data-src="transform500pxUrl"
    // />
    'lazyLoaded' => [
      // optional lazysizes. Can be boolean (true = lazysizes, false = no lazysizes) or
      // string (uses string value for src attribute value)
      'lazysizes' => true,
      'img' => [
        'sizes' => '25vw',
        'widths' => [500, 1000]
      ]
    ],
 
    // the default style will be used when none is specified.
    'default' => [
      'img' => [
        'widths' => [500],
      ]
    ]
  ],

  // the urlTransforms are used to specify individual urls for
  // craft.picture.url
  'urlTransforms' => [
    // the 'hero' transform - these image will be 7:3, and 1000px wide
    'hero' => [
      'aspectRatio' => 7/3,
      'width' => 1000
    ],
    'test' => [
      'mode' => 'stretch',
      'height' => 50,
      'width' => 200,
    ]
  ],

  // lazysizesTrigger is an optional override for elements loaded with
  // lazysizes. It changes the class value from 'lazyload'
  'lazysizesTrigger' => 'js-lazyload'
];